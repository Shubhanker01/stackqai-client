const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const streamOutput = async (prompt, cb) => {
    try {
        console.log(prompt)
        const response = await fetch('http://localhost:9000/api/v1/model/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prompt)
        })

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let full = ""
        while (true) {
            const { value, done } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value)
            const lines = chunk.split('\n\n')
            for (const line of lines) {
                if (line.startsWith('output:')) {
                    const token = line.replace('output:', '')
                    if (token.trimStart() === '[DONE') {
                        return full
                    }

                    full += token
                    // artificial delay for simulating streaming
                    await delay(35)
                    cb(full)

                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}