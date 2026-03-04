(function() {
    const outputArea = document.getElementById('output-text');
    const outputContainer = document.getElementById('output-area');
    const lineCountSpan = document.getElementById('line-count');
    const clearBtn = document.getElementById('clear-btn');
    const panicBtn = document.getElementById('panic-btn');
    const modeStatus = document.getElementById('mode-status');
    const linesLabel = document.getElementById('lines-label');
    const modeLabel = document.getElementById('mode-label');
    const clearLabel = document.getElementById('clear-label');
    const panicLabel = document.getElementById('panic-label');
    const promptText = document.getElementById('prompt-text');

    // Detectar idioma por el HTML
    const isEnglish = document.documentElement.lang === 'en';
    
    // Textos según idioma
    const texts = {
        es: {
            lines: 'Líneas generadas',
            mode: 'Modo',
            clear: 'Limpiar pantalla',
            panic: 'PANIC',
            sysConnecting: '[SYSTEM] Conectando al servidor objetivo...',
            sysTunnel: '[SYSTEM] Estableciendo túnel SSL... OK',
            sysBypass: '[SYSTEM] Bypass de firewall detectado. Inyectando payload.',
            sysReady: '[SYSTEM] Listo para recibir comandos. Empieza a escribir...',
            sysCleared: '[SYSTEM] Pantalla despejada. Esperando intrusiones...',
            sysPanic: '[SYSTEM] 🔴 PANIC ACTIVADO! Ocultando rastros...',
            sysStealth: '[SYSTEM] Modo sigilo. Sigue escribiendo para continuar.',
            siriusMessage: '\n\n[SYSTEM] ⚠️ MODO SIRIUS ACTIVADO - BIENVENIDO AL LADO OSCURO AMARILLO ⚠️\n\n',
            glitchMessage: '⚠️ NOeye conoce tu IP: 192.168.95.150 ⚠️'
        },
        en: {
            lines: 'Lines generated',
            mode: 'Mode',
            clear: 'Clear screen',
            panic: 'PANIC',
            sysConnecting: '[SYSTEM] Connecting to target server...',
            sysTunnel: '[SYSTEM] Establishing SSL tunnel... OK',
            sysBypass: '[SYSTEM] Firewall bypass detected. Injecting payload.',
            sysReady: '[SYSTEM] Ready for commands. Start typing...',
            sysCleared: '[SYSTEM] Screen cleared. Waiting for intrusions...',
            sysPanic: '[SYSTEM] 🔴 PANIC ACTIVATED! Hiding traces...',
            sysStealth: '[SYSTEM] Stealth mode. Keep typing to continue.',
            siriusMessage: '\n\n[SYSTEM] ⚠️ SIRIUS MODE ACTIVATED - WELCOME TO THE YELLOW SIDE ⚠️\n\n',
            glitchMessage: '⚠️ NOeye knows your IP: 192.168.95.150 ⚠️'
        }
    };

    const t = isEnglish ? texts.en : texts.es;

    // Aplicar textos iniciales
    if (linesLabel) linesLabel.textContent = t.lines;
    if (modeLabel) modeLabel.textContent = t.mode;
    if (clearLabel) clearLabel.textContent = t.clear;
    if (panicLabel) panicLabel.textContent = t.panic;

    const hackerPhrases = [
        "sudo rm -rf --no-preserve-root /", "chmod 777 -R /etc/passwd", "nmap -sS -A -T4 192.168.1.0/24",
        "hydra -l admin -P rockyou.txt ssh://target", "echo 'You have been pwned!'", "sqlmap -u http://testphp.vulnweb.com/artists.php?id=1 --dbs",
        "msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.1.2 LPORT=443 -f elf > shell.elf",
        "wireshark -i eth0 -k", "airmon-ng start wlan0", "airodump-ng mon0", "john --format=raw-md5 hashes.txt",
        "gobuster dir -u https://target.com -w common.txt", "nikto -h https://target.com", "openssl s_client -connect target:443",
        "tcpdump -i any -n port 80", "iptables -A INPUT -s 192.168.1.5 -j DROP", "cat /dev/urandom | hexdump -C | grep 'ca fe'",
        "ssh -D 8080 -f -C -q -N user@server", "proxychains firefox", "curl -X POST http://vuln-site.com/login -d 'user=admin&pass=123'",
        "perl -e 'print pack \"H*\", \"deadbeef\"'", "python -c 'import pty; pty.spawn(\"/bin/bash\")'", "echo 'd2hvYW1pCg==' | base64 -d",
        "dd if=/dev/mem | grep 'secret'", "strings /bin/ls | grep libc", "gcc exploit.c -o exploit -lpthread",
        "nc -lvnp 4444 -e /bin/bash", "telnet towel.blinkenlights.nl", "ping -c 4 8.8.8.8", "traceroute -m 15 google.com",
        "whois facebook.com", "dig mx google.com", "host -t ns wikipedia.org", "nslookup 1.1.1.1", "git clone https://github.com/exploitdb/exploitdb",
        "docker run -it ubuntu bash", "kubectl get pods --all-namespaces", "ansible all -m ping", "make install", "./configure --prefix=/usr/local",
        "sysctl -w kernel.randomize_va_space=0", "echo '0' > /proc/sys/net/ipv4/ip_forward", "modprobe dummy", "dmesg | tail -20",
        "ssh-keygen -t rsa -b 4096", "gpg -c secret.txt", "openssl enc -aes-256-cbc -in secret.txt -out secret.enc",
        "file /bin/bash", "ldd /usr/bin/ssh", "strace -e open ls", "ltrace -c ssh user@host", "gdb ./program",
        "objdump -d program | grep 'mov'", "readelf -h /bin/ls", "nm -D /usr/lib/libc.so", "ps aux | grep apache",
        "netstat -tulpn", "ss -tulwn", "lsof -i :80", "fdisk -l", "df -h", "du -sh ~", "free -m", "top -b -n 1",
        "killall -9 firefox", "pkill -f 'nc -lvnp'", "renice -n -5 -p 1234", "crontab -e", "systemctl start ssh",
        "service ssh status", "journalctl -xe", "tail -f /var/log/syslog", "grep 'Failed' /var/log/auth.log",
        "iptables-save", "ufw status verbose", "route -n", "ip addr show", "ifconfig eth0 promisc",
        "echo 'HELLO' > /dev/tcp/127.0.0.1/8080", "timeout 5 bash -c 'cat < /dev/tcp/time.nist.gov/13'"
    ];

    const codeSnippets = [
        "void exploit() { system(\"/bin/sh\"); }", "int main() { char payload[] = \"\\x31\\xc0\\x50\\x68\"; }",
        "class Payload { public static void main(String[] args) { Runtime.exec(\"id\"); } }",
        "import socket; s = socket.socket(); s.connect(('target', 80)); s.send('GET / HTTP/1.1\\r\\n');",
        "<?php system($_GET['cmd']); ?>", "document.cookie = 'admin=true';", "sudo() { sudo /usr/bin/sudo $@; }",
        "alias ll='ls -la'", "PATH=.:$PATH", "export LD_PRELOAD=./malicious.so", "with open('/etc/passwd', 'a') as f: f.write('root2::0:0::/root:/bin/bash')",
        "Process p = Runtime.getRuntime().exec(\"cmd /c start\");", "forkbomb() { forkbomb | forkbomb & }; forkbomb"
    ];

    const fullHackerPool = [...hackerPhrases, ...codeSnippets];
    let lineCounter = 0;
    let currentContent = '';
    let lastEasterEgg = null;
    let cooldownActive = false;
    let siriusEasterEggActivated = false;

    function ensureFocus() {
        if (document.activeElement !== outputContainer) {
            outputContainer.focus({ preventScroll: true });
        }
    }

    function triggerGlitchEffect(message) {
        const originalBg = outputContainer.style.background;
        const originalColor = outputContainer.style.color;
        const originalTransform = outputContainer.style.transform;
        
        outputContainer.style.animation = 'glitch-bg 0.2s infinite';
        outputContainer.style.background = 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff00ff)';
        outputContainer.style.backgroundSize = '400% 400%';
        outputContainer.style.color = '#ffffff';
        outputContainer.style.textShadow = '3px 3px 0 #ff0000, -3px -3px 0 #0000ff, 3px -3px 0 #00ff00';
        outputContainer.style.transform = 'skew(2deg, 1deg)';
        
        const glitchLine = message + '\n';
        currentContent += glitchLine;
        outputArea.innerText = currentContent;
        lineCounter++;
        lineCountSpan.textContent = lineCounter;
        
        setTimeout(() => {
            outputContainer.style.animation = '';
            outputContainer.style.background = originalBg;
            outputContainer.style.color = originalColor;
            outputContainer.style.textShadow = '';
            outputContainer.style.transform = originalTransform;
            outputContainer.style.backgroundSize = '';
        }, 1200);
    }

    function activateSiriusMode() {
        if (siriusEasterEggActivated) return;
        siriusEasterEggActivated = true;
        alert("SIRIUS KNEW YOU WOULD BE THAT SICK");
        
        document.body.style.backgroundColor = '#ffff00';
        document.body.style.color = '#000000';
        document.body.style.textShadow = 'none';
        
        const hackerRoom = document.getElementById('hacker-room');
        const controlPanel = document.getElementById('control-panel');
        
        hackerRoom.style.backgroundColor = '#ffff00';
        hackerRoom.style.borderColor = '#000000';
        hackerRoom.style.boxShadow = '0 0 30px #ffff00';
        hackerRoom.style.color = '#000000';
        
        outputContainer.style.backgroundColor = '#ffff00';
        outputContainer.style.color = '#000000';
        outputContainer.style.caretColor = '#000000';
        
        const statusBar = document.getElementById('status-bar');
        statusBar.style.backgroundColor = '#cccc00';
        statusBar.style.color = '#000000';
        statusBar.style.borderBottomColor = '#000000';
        
        const inputLine = document.getElementById('input-line');
        inputLine.style.backgroundColor = '#cccc00';
        inputLine.style.color = '#000000';
        inputLine.style.borderColor = '#000000';
        
        controlPanel.style.backgroundColor = '#cccc00';
        controlPanel.style.color = '#000000';
        controlPanel.style.borderColor = '#000000';
        
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#000000';
            btn.style.color = '#ffff00';
            btn.style.borderColor = '#000000';
        });
        
        const siriusMessage = t.siriusMessage;
        currentContent += siriusMessage;
        outputArea.innerText = currentContent;
        lineCounter += 3;
        lineCountSpan.textContent = lineCounter;
    }

    function addHackerText() {
        if (!siriusEasterEggActivated && lineCounter >= 999) {
            activateSiriusMode();
            return;
        }
        
        let easterEggActivated = false;
        
        if (!cooldownActive) {
            const randomValue = Math.random() * 100;
            
            if (randomValue < 0.5 && lastEasterEgg !== 'pyce') {
                const pyceLine = '> access_token = "******************"\n' +
                                 '> decrypt("Pyce' + 'y'.repeat(Math.floor(Math.random() * 3) + 1) + '")';
                
                currentContent += pyceLine + '\n';
                outputArea.innerHTML = currentContent.replace(
                    /Pycey*/g, 
                    match => `<span style="color: #4287f5; font-weight: bold; text-shadow: 0 0 15px #4287f5;">${match}</span>`
                );
                
                lineCounter++;
                lineCountSpan.textContent = lineCounter;
                lastEasterEgg = 'pyce';
                easterEggActivated = true;
            }
            else if (randomValue >= 0.5 && randomValue < 1.0 && lastEasterEgg !== 'kirb') {
                const kirbLine = '$ echo "Access Granted for Kirb' + '!'.repeat(Math.floor(Math.random() * 5) + 1) + '"';
                
                currentContent += kirbLine + '\n';
                outputArea.innerHTML = currentContent.replace(
                    /Kirb!*/g, 
                    match => `<span style="color: #ff69b4; font-weight: bold; text-shadow: 0 0 15px #ff69b4;">${match}</span>`
                );
                
                lineCounter++;
                lineCountSpan.textContent = lineCounter;
                lastEasterEgg = 'kirb';
                easterEggActivated = true;
            }
            else if (randomValue >= 1.0 && randomValue < 1.5 && lastEasterEgg !== 'glitch') {
                triggerGlitchEffect(t.glitchMessage);
                lastEasterEgg = 'glitch';
                easterEggActivated = true;
            }
        }

        if (easterEggActivated) {
            cooldownActive = true;
            setTimeout(() => { cooldownActive = false; }, 300);
        } else {
            const randomIndex = Math.floor(Math.random() * fullHackerPool.length);
            let randomText = fullHackerPool[randomIndex];

            if (Math.random() > 0.7) randomText = '$ ' + randomText;
            else if (Math.random() > 0.8) randomText = '> ' + randomText;
            if (Math.random() > 0.9) randomText = '# ' + randomText;
            if (Math.random() > 0.95) randomText = '\n' + randomText;

            const newLine = randomText + '\n';
            currentContent += newLine;
            outputArea.innerText = currentContent;
            lineCounter++;
            lineCountSpan.textContent = lineCounter;
        }
        
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    function clearScreen() {
        currentContent = '';
        outputArea.innerHTML = '';
        lineCounter = 0;
        lineCountSpan.textContent = lineCounter;
        lastEasterEgg = null;
        cooldownActive = false;
        siriusEasterEggActivated = false;

        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.body.style.textShadow = '';
        
        const hackerRoom = document.getElementById('hacker-room');
        const controlPanel = document.getElementById('control-panel');
        
        hackerRoom.style.backgroundColor = '';
        hackerRoom.style.borderColor = '';
        hackerRoom.style.boxShadow = '';
        hackerRoom.style.color = '';
        
        outputContainer.style.backgroundColor = '';
        outputContainer.style.color = '';
        outputContainer.style.caretColor = '';
        
        const statusBar = document.getElementById('status-bar');
        statusBar.style.backgroundColor = '';
        statusBar.style.color = '';
        statusBar.style.borderBottomColor = '';
        
        const inputLine = document.getElementById('input-line');
        inputLine.style.backgroundColor = '';
        inputLine.style.color = '';
        inputLine.style.borderColor = '';
        
        controlPanel.style.backgroundColor = '';
        controlPanel.style.color = '';
        controlPanel.style.borderColor = '';
        
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        });

        setTimeout(() => {
            if (currentContent === '') {
                currentContent = t.sysCleared + '\n';
                outputArea.innerText = currentContent;
                lineCounter = 1;
                lineCountSpan.textContent = lineCounter;
            }
        }, 50);
        
        ensureFocus();
    }

    function panic() {
        clearScreen();
        currentContent = t.sysPanic + '\n' + t.sysStealth + '\n';
        outputArea.innerText = currentContent;
        lineCounter = 2;
        lineCountSpan.textContent = lineCounter;
        ensureFocus();
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'F5' || (event.ctrlKey && event.key === 'r') || 
            (event.ctrlKey && event.key === 'R') || (event.metaKey && event.key === 'r')) {
            return;
        }
        
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
        }
        
        addHackerText();
        ensureFocus();
        
        modeStatus.textContent = isEnglish ? 'HACKING' : 'HACKEANDO';
        setTimeout(() => { modeStatus.textContent = 'HACK'; }, 100);
    });

    outputContainer.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        addHackerText();
    });

    outputContainer.setAttribute('tabindex', '0');
    
    window.onload = () => {
        currentContent = '';
        outputArea.innerHTML = '';
        currentContent += t.sysConnecting + '\n';
        currentContent += t.sysTunnel + '\n';
        currentContent += t.sysBypass + '\n';
        currentContent += t.sysReady + '\n';
        currentContent += '> _ \n';
        
        outputArea.innerText = currentContent;
        lineCounter = 5;
        lineCountSpan.textContent = lineCounter;
        outputContainer.scrollTop = outputContainer.scrollHeight;
        
        lastEasterEgg = null;
        cooldownActive = false;
        siriusEasterEggActivated = false;
        ensureFocus();
    };
    
    document.addEventListener('click', (event) => {
        if (!event.target.closest('button')) ensureFocus();
    });
    
    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearScreen();
    });
    
    panicBtn.addEventListener('click', (event) => {
        event.preventDefault();
        panic();
    });
})();