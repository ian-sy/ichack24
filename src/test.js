const {evaluateUserInput} = require('./gpt');

async function test() {

    let map = [['X', 'X', 'X', 'X', 'X', 'X'],
                ['X', 'O', 'X', 'Y', 'E', 'X'],
                ['X', 'O', 'X', 'O', 'O', 'X'],
                ['X', 'Y', 'O', 'R', 'O', 'X'],
                ['X', 'S', 'X', 'X', 'O', 'X'],
                ['X', 'X', 'X', 'X', 'X', 'X']]
    // let map = [ ['X', 'X', 'X', 'X', 'X', 'X'],
    //             ['X', 'O', 'O', 'Y', 'E', 'X'],
    //             ['X', 'O', 'X', 'O', 'O', 'X'],
    //             ['X', 'Y', 'O', 'R', 'O', 'X'],
    //             ['X', 'S', 'X', 'X', 'O', 'X'],
    //             ['X', 'X', 'X', 'X', 'X', 'X']]
    console.log('TFALSE'.includes('FALSE'))
    let instr = "walk up from the starting point. If you hit a yellow box, turn right. If you hit a red box, turn left. If you hit the end point. Stop."
    // let instr = "walk up from the starting point. If you hit and wall, turn right and continue. Stop when you reach the endpoint."
    let result = await evaluateUserInput(map, instr)
    console.log(result)
}
test()