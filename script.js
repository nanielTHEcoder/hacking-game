function getUserInput(promptText) {
    return new Promise(resolve => {
        const output = document.getElementById("output")
        output.textContent += promptText + " "
        
        const input = document.createElement("input")
        input.style.cssText = "background:black;color:white;border:none;outline:none;font-family:inherit;font-size:inherit;"
        output.appendChild(input)
        input.focus()
        
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                const userInput = input.value
                input.remove()
                output.textContent += userInput + "\n"
                resolve(userInput)
            }
        });
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
      
function writer(text, speed = 25) {
    return new Promise(resolve => {
        let i = 0
        function typeChar() {
            if (i < text.length) {
                document.getElementById("output").textContent += text.charAt(i)
                i++
                setTimeout(typeChar, speed)
            } else {
                document.getElementById("output").textContent += "\n"
                resolve()
            }
        }
        typeChar()
    });
}

function startLoadingDots(baseText, lineIndex, dotCount, intervalMs = 500, charcater) {
    const output = document.getElementById("output")
    let dots = 0

    const interval = setInterval(() => {
        dots = (dots + 1) % (dotCount + 1)
        const lines = output.textContent.split('\n')
        lines[lineIndex] = baseText + `${charcater}`.repeat(dots)
        output.textContent = lines.join('\n')
    }, intervalMs)

    return () => clearInterval(interval)
}

async function loading(dotCount, string, interval, time, message) {  //intervall defual = 500
    await writer("")

    const lineIndex = document.getElementById("output").textContent.split("\n").length - 2
    const stopLoading = startLoadingDots(`${message}`, lineIndex, dotCount, `${interval}`, `${string}`)

    await sleep(time)
    stopLoading()
}
async function help() {
    await writer("------------------------------")
    await writer("Available Commands:")
    await writer("help                - Show this list of commands.")
    await writer("netdiscover         - Scan for active IP addresses (ssh ports work only with SSH command, and http only works with http command, TCP works with anything else).")
    await writer("portscan [ip]       - Scan the given IP address for open ports.")
    await writer("ssh [ip] [port] [password] - Connect to a device using a password (must include ip and port).")
    await writer("http [ip] [port]    - connects to a http server.")  // chat server user asks for password hints to the ssh server (its my sons name with how old he is next to it no spaces, no capitals)
    await writer("packetsniff [ip] [port] - captures packets on a network e.g. recent web searches, chat messages.") // web request to good activities for 9 year olds, chat message with someone: what should I get ben for lunch today
    await writer("login [ip] [port] [username] [password] - connects to database-101")

    await writer("-------------------------------")
    await writer("For Navigating machines: ")
    await writer("dir                 - List all files and folders in the current directory.")
    await writer("cd [folder]         - Change to a folder or directory (e.g., cd desktop).")
    await writer("cd ..               - Go back a directory.")
    await writer("start [file name]   - Opens a file e.g. start document.txt.")
}

async function run() {

    await writer("------------------------------")
    await writer("Loading HACKER_TERMINAL.exe")
    await loading(3,".", 500, 5000, "Loading")
    await writer("System initialized.")
    await writer("------------------------------")
    await writer("Installing modules.")
    await loading(3,".", 500, 5000, "Loading")
    await writer("12 Modules loaded.")
    await writer("------------------------------")
    await writer("Please enter user and password.")
    await writer("USER: user")
    await loading(100,"*", 350, 4000, "PASSWORD: ")
    await writer("ACCESS GRANTED.")
    await writer("------------------------------")
    await writer("welcome user if you want to relay instruction please press 1")
    input = 0;
    while (input != 1) {
        input = await getUserInput("> ")
        if (input == 1) {
            await writer("welcome user, your goal is to hack database-101.")
            await writer("this is a database that belongs to the american government.")
            await writer("the database contains all 21 working neuclear launch codes.")
            await writer("you must revtreive all of them.")
            await writer("type 'help' to receive a list of commands.")
        } else {
            await writer("Invalid command.")
        }
    }
    input = 0;
    while (input != "help") {
        input = await getUserInput("> ")
        if (input == "help") {
            help()
        } else {
            await writer("Invalid command.")
        }
    }

}

run()