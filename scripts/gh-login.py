import pty
import os
import time

master, slave = pty.openpty()

pid = os.fork()
if pid == 0:
    # Child process
    os.close(master)
    os.dup2(slave, 0)
    os.dup2(slave, 1)
    os.dup2(slave, 2)
    os.close(slave)
    os.execvp("gh", ["gh", "auth", "login", "--hostname", "github.com", "--git-protocol", "https", "--web"])
else:
    # Parent process
    os.close(slave)
    time.sleep(1)
    # Send Enter to confirm "? Authenticate Git with your GitHub credentials? Yes"
    os.write(master, b"\r\n")
    
    # Read output
    output = b""
    for _ in range(30):
        try:
            chunk = os.read(master, 1024)
            if chunk:
                output += chunk
                if b"one-time code" in output:
                    break
        except Exception:
            break
        time.sleep(0.2)
        
    print(output.decode('utf-8', errors='ignore'))

