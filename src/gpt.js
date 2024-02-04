const OpenAI = require('openai')

const openai = new OpenAI({apiKey: "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",});

//     const fewShotPrompt = `
//     Map: 
//     [ ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'O', 'O', 'Y', 'E', 'X'],
//     ['X', 'O', 'X', 'O', 'O', 'X'],
//     ['X', 'Y', 'O', 'R', 'O', 'X'],
//     ['X', 'S', 'X', 'X', 'O', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X']]
//     Instruction: walk up from the starting point. If you hit and wall, turn right and continue. Stop when you reach the endpoint.
//     Answer: [(4, 1), (3, 1), (2, 1), (1, 1), (1, 2), (1, 3), (1, 4)] 

//     Map: 
//     [ ['X', 'X', 'X', 'X', 'X', 'X'],
//     ['X', 'O', 'O', 'Y', 'E', 'X'],
//     ['X', 'O', 'X', 'O', 'O', 'X'],
//     ['X', 'Y', 'O', 'R', 'O', 'X'],
//     ['X', 'S', 'X', 'X', 'O', 'X'],
//     ['X', 'X', 'X', 'X', 'X', 'X']]
//     Instruction: walk randomly until you reach the endpoint.
//     Answer: FALSE the instruction to walk randomly is too ambiguous.

async function getGPTResponse(messages) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        // tools: tools? tools : [],
        // tool_choice: "auto"
      });
    return completion
}

async function getInitialGPTResult(query_msg) {
    const gameIntroPrompt = "I will send you a map, a 2D array of characters. 'O' represents an empty space, 'X' represents a wall, 'S' represents the starting point," + 
    "and 'E' represents the ending point, 'Y' represents a yellow box and 'R' represents a red box. " +
    "Then, I will also send you an instruction. Give me a list of coordinates that you would follow based on the " +
    "instruction to traverse the map, with the goal of reaching the endpoint from the starting point. " +
    "Follow the instructions strictly. Show every step taken, including any backtracks, and carefully explain your thought process. " +
    "If the instruction is clear and executable, and the path ends at the endpoint, return the list of coordinates traversed. " +
    "Otherwise, if there is something unclear about the instruction, or if you stepped on a wall coordinate or go out of boundaries " +
    "or if the path does not end at the endpoint, say FALSE and give a short description of what went wrong."
    var messages = [{"role": "system", "content": "you are a helpful assistant."},
                    {"role": "user", "content": gameIntroPrompt},
                    {"role": "user", "content": query_msg + "Let's think step by step."}]
    var completion = await getGPTResponse(messages)
    console.log(completion.choices[0]['message']['content']);
    messages.push({"role": "assistant", "content": completion.choices[0]['message']['content']})
    return messages
}

async function evaluateUserInput(map, instruction) {
    // let tools = await createTools()
    let query_msg = await parseMapAndFormQuerySentence(map, instruction)
    console.log(query_msg)
    let init_messages = await getInitialGPTResult(query_msg)
    let messages = await criticiseLastMessage(init_messages)
    try {
        let response = await summariseAndParseOutput(messages)
        return response
    } catch (error) {
        try {
            let response = await summariseAndParseOutput(messages)
            return response
        } catch (error) {
            console.log("there is an error in the response" + error.message)
            const retryMessage = 
                `Hey there! Thank you so much for giving it a shot! 
                We truly appreciate your effort. Could you please try again and explain your thoughts with more detail? 
                We want to make sure you have a crystal-clear understanding of the concept.`
            return {"status": false, "result": retryMessage}
        }
    }
}

async function criticiseLastMessage(messages) {
    // let criticismPrompt = "Cautiously review your previous response to ensure if it is correct. If it is correct, repeat it word by word. Otherwise, give an updated response. Let's think step by step."
    // let new_messages = [...messages, {"role": "user", "content": criticismPrompt}]
    let criticismPrompt = "Ignore your previous response. Independently answer the question again. Let's think step by step"
    messages.push({"role": "user", "content": criticismPrompt})
    let completion = await getGPTResponse(messages)
    console.log(completion.choices[0]['message']['content'])
    // push the content of the last message to the new response
    messages.push({"role": "assistant", "content": completion.choices[0]['message']['content']})

    // summarize the two responses
    let summarizePrompt = "You are now the judge. Based on the reasoning in the previous responses, independently decide which one is correct, and repeat the correct response word by word. Let's carefully think step by step."
    messages.push({"role": "user", "content": summarizePrompt})
    let completion2 = await getGPTResponse(messages)
    console.log(completion2.choices[0]['message']['content'])
    // push the content of the last message to the new response
    messages.push({"role": "assistant", "content": completion2.choices[0]['message']['content']})
    return messages
}

// async function createTools() {
//     let tools = [
//         {
//             "type": "function",
//             "function": {
//                 "name": "get_current_character_from_map",
//                 "description": "Indexes the map which is a 2D array to get the character at the current coordinate.",
//                 "parameters": {
//                     "type": "object",
//                     "properties": {
//                         "map": {
//                             "type": "array",
//                             "description": "The input map in the form of a 2D array of characters. Moving up decreases x, moving down increases x, moving right increases y, moving left decreases y.",
//                         },
//                         "current_coordinate_x": {
//                             "type": "integer",
//                             "description": "The x coordinate of the current coordinate on the map in the form (x, y). ",
//                         },
//                         "current_coordinate_y": {
//                             "type": "integer",
//                             "description": "The y coordinate of the current coordinate on the map in the form (x, y). ",
//                         },
//                     },
//                     "required": ["map", "current_coordinate_x","current_coordinate_y"],
//                 },
//             }
//         },
//     ]
//     return tools
// }

async function summariseAndParseOutput(messages) {
    console.log(messages)
    let message = messages[messages.length - 1].content
    console.log(message, message.includes('FALSE'))
    if (message.includes('FALSE')) {
        const summarize_prompt = `Based on your last response, return me a short explanation of why the instruction is unclear. Do not output anything else.`
        messages.push({"role": "user", "content": summarize_prompt})
        let completion = await getGPTResponse(messages)
        let output = completion.choices[0]['message']['content']
        console.log(output)
        return {"status": false, "result": output}
    } else {
        const getOutputPrompt = `Based on your last response, return me a list of coordinates only. Do not output anything else.`
        messages.push({"role": "user", "content": getOutputPrompt})
        let completion = await getGPTResponse(messages)
        let output = completion.choices[0]['message']['content']
        console.log(output);
        try {
            output = output.replace(/\(/g, '[').replace(/\)/g, ']');
            let outputArray = JSON.parse(output);
            console.log(outputArray);
            return {"status": true, "result": outputArray}
        } catch (error) {
            throw new Error('Failed to parse output to JSON');
        }
}
    }
    

async function parseMapAndFormQuerySentence(map, instruction) {
	let mapStr = '[' + map.map(row => JSON.stringify(row)).join('\n') + ']';
	console.log(mapStr);
    return "Map:\n" + mapStr + "\nInstruction: " + instruction
}

module.exports= {evaluateUserInput};
