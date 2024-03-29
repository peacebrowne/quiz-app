
const base = [
    {
        "id": 0,
        "question": 'Which of the following is used to indicate an executable file?',
        "correctAns": '*',
        "answers": [
            '@',
            '*',
            '#',
        ],
        topic: 'linux',
        status: 'default'
    },


    {
        "id": 1,
        "question": 'From/desktop/shell-data-lesson/exercise-data/creatures, a command that navigates to shell-data-lesson is',
        "correctAns": 'cd ..',
        "answers": [
            'cd',
            'cd..',
            'cd ..'
        ],
        topic: 'linux',
        status: 'default'
    } ,


    {
        "id": 2,
        "question": 'According to the notes, what does a file extension do?',
        "correctAns": 'It indicates what type of data the file holds',
        "answers": [
            'It indicates what type of data the file holds',
            'It causes the operating system to malfunction',
            'It makes a file readable',
        ],
        topic: 'linux',
        status: 'default'
    }

,
    {
        "id": 3,
        "question": 'Which of the below listed is not true of rm?',
        "correctAns": 'Remove a directory',
        "answers": [

            'Remove a directory',
            'Remove a file',
            'Remove file in a folder like data/test.txt',
        ],
        topic: 'linux',
        status: 'default'
    }

    ,
    {
        "id": 4,
        "question": 'The output of $ls -Ss exercise-data/ will',
        "correctAns": 'b and c',
        "answers": [
            
            'list all the elements in the exercise-data folder, sort all the files and directories by size',
            'display the size of files and directories alongside the names',
            'b and c',
        ],
        topic: 'linux',
        status: 'default'
    } 
    
    ,
    {
        "id": 5,
        "question": 'The command $ls -rthl will print',
        "correctAns": 'The most recently changed file is listed last and a long list of files/directories sizes in human readable format',
        "answers": [
            'The most recently changed file is listed last and a long list of files/directories sizes in human readable format',
            'a listing of a specific file or directory in order',
            'All',
        ],
        topic: 'linux',
        status: 'default'
    }


    ,
    {
        "id": 6,
        "question": 'In Desktop directories, ls -F command displays the following directories: shell-lesson-data/  test/. What happens when we execute this command rm -i test?',
        "correctAns": 'Prompt to confirm before removal',
        "answers": [
            'Copy test',
            'Prompt to confirm before removal',
            'Throw an error',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,
    {
        "id": 7,
        "question": `In the KIT-Cohort2 directory, I have the below files and directories.
        Attendance/assignment.dat assessment/ quiz.dat
        What command do I need to run so that the command below will produce the output shown?
        Command: KIT-Cohort2$ ls assessment
        Output: assignment.dat quiz.dat`,
        "correctAns": 'mv *.dat assessment/',
        "answers":[
            'rm **.dat assessment/',
            'mv *.dat assessment/',
            'mv *.dat',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,
    {
        "id": 8,
        "question": 'Below are the names of -F in the command $ls -F except',
        "correctAns": 'Command',
        "answers": [

            'Flag',
            'Switch',
            'Command',
        ],
        topic: 'linux',
        status: 'default'
    }
   ,

    {
        "id": 9,
        "question": 'When run in the proteins directory, with wildcards which ls command(s) will produce this output? ethane.pdb methane.pdb',
        "correctAns": 'ls *t??ne.pdb',
        "answers": [

            'ls *t*ane.pdb',
            'ls *t?ne.*',
            'ls *t??ne.pdb',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,

    {
        "id": 10,
        "question": 'In the nano editor, the command ^_ means',
        "correctAns": 'Go To Line',
        "answers": [

            'Where is',
            'Location',
            'Go To Line',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,{
        "id": 11,
        "question": 'The command used in our lesson to create a directory is',
        "correctAns": 'mkdir',
        "answers": [

            'touch',
            'cat',
            'mkdir',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,{
        "id": 12,
        "question": 'A text editor for Unix-like systems that can be access in the terminal is called',
        "correctAns": 'Nano',
        "answers": [

            'Unix',
            'Linux',
            'Nano',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,{
        "id": 13,
        "question": 'What does the cp do when given several files arguments and a directory argument name?',
        "correctAns": 'Copy the files to the drectory provided',
        "answers": [
            'Move the files to the directory provided',
            'Copy the files to the drectory provided',
            'Delete the files to the directory provided',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,

    {
        "id": 14,
        "question": 'Oftentimes one needs to copy or move several files at once. This can be done by providing a list of unknown individual filenames. The pattern use for specifying these names is called',
        "correctAns": 'wildcard',
        "answers": [
            'extension',
            'wildcard',
            'thesis',
            'nano',
        ],
        topic: 'linux',
        status: 'default'
    }
    ,{
        "id": 15,
        "question": 'The wildcardm which matches zero or more characters is',
        "correctAns": 'Alsterick(*)',
        "answers": [

            'tilde(~)',
            'Alsterick(*)',
            'backslash(/)',
        ],
        topic: 'linux',
        status: 'default'
    },


    {
        "id": 0,
        "question": 'The variable name of an array must always be',
        "correctAns": 'none of the above',
        "answers": [
    
            'array',
            'Array',
            'none of the answers',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 1,
        "question": 'What is the index of  “3” in the array [1,3,2,4,6,7]',
        "correctAns": '1',
        "answers": [
    
            '3',
            '2',
            '1',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,
    {
        "id": 2,
        "question": 'An index of an item in an array is the',
        "correctAns": 'location of that item in the array',
        "answers": [
    
            'position of the array to that item',
            'location of that item in the array',
            'usage of that item to the',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,
    {
        "id": 3,
        "question": 'The .push()method is used to:',
        "correctAns": 'add an item to the end of an array',
        "answers": [
    
            'push the code to the console',
            'join the value to the array',
            'add an item to the end of an array',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,
    {
        "id": 4,
        "question": 'According to the video the concept of a todo list is important to us as we build projects because:',
        "correctAns": 'A',
        "answers": [
    
            'it helps us organize our project',
            'it list the array inorder',
            'A',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,
    {
        "id": 5,
        "question": 'HTML stands for',
        "correctAns": 'Hyper Text Markup Language',
        "answers": [
    
            'Hyper Technology Markup Language',
            'Hyper Test Markdown law',
            'Hyper Test Markup law',
            'Hyper Text Markup Language',
        ],
        topic: 'html',
        status: 'default'
    }
    ,
    {
        "id": 6,
        "question": 'An example of variables declaration is',
        "correctAns": 'var age;',
        "answers": [
    
            'var age.',
            'Var age;',
            'var',
            'var age;',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 7,
        "question": 'What is an example of variables initialization',
        "correctAns": 'age = 5;',
        "answers": [
    
            'age => 3;',
            'age = 5;',
            'age > 7',
            'age == 5;',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 8,
        "question": 'Variables can be declared and initialized',
        "correctAns": 'anywhere in the code',
        "answers": [
    
            'only at the end of the code',
            'in the middle and at the top of the code',
            'only at the beginning of the code',
            'anywhere in the code',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 9,
        "question": 'We use console.log to',
        "correctAns": 'print output to the browser console',
        "answers": [
    
            'edit the errors in our code',
            'get the length of an array',
            'know the variable name',
            'print output to the browser console',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 10,
        "question": ' __ is the symbol used to assign a value or values to a variable in Javascript',
        "correctAns": '=',
        "answers": [
    
            ' = and =>',
            '== or =',
            ';',
            '=',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 11,
        "question": 'Which symbol is used to represent an array in JavaScript?',
        "correctAns": '[]',
        "answers": [
    
            '()',
            '</>',
            '{}',
            '[]',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 12,
        "question": 'Which array method returns the length of the array',
        "correctAns": '.length()',
        "answers": [
    
            '.long()',
            '.lenthg()',
            '.counter()',
            '.length()',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 13,
        "question": 'Which array method is the direct opposite to the .pop() method',
        "correctAns": '.push()',
        "answers": [
    
            '.unpop()',
            '.span()',
            '.unshift()',
            '.push()',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 14,
        "question": 'The array method .unshift() is used to',
        "correctAns": 'add an item or items to the start of an array',
        "answers": [
    
            'stop the shifting of an array',
            'add an item or items to the end of an array',
            'remove an item or items to the start of an array',
            'add an item or items to the start of an array',
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 15,
        "question": 'Items in an array are separated by',
        "correctAns": 'comma (,)',
        "answers": [
    
            'colon (:)',
            'semicolon (;)',
            'comma (,)',
            'quotation mark (“ “)'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 16,
        "question": 'A variable declaration begins with the keyword var and ends with',
        "correctAns": 'semicolon ( ; )',
        "answers": [
    
            'colon ( : )',
            'semicolon ( ; )',
            'comma ( : )',
            'quotation mark (“ “)'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 17,
        "question": 'The keyword var is used in Javascript to',
        "correctAns": 'Declare a variable',
        "answers": [
    
            'Store a value',
            'store a variable',
            'Declare a value',
            'Declare a variable'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 18,
        "question": 'An array in javaScript is considered a',
        "correctAns": 'list',
        "answers": [
    
            'line of items',
            'group of code',
            'list',
            'list of color'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 19,
        "question": 'What is the best way of declaring and initializing a variable',
        "correctAns": 'var name = “john”;',
        "answers": [
    
            'Var name => “John”;',
            'var = name;”john”;',
            'var name = “john”;',
            'Var name = “John”;'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 20,
        "question": 'All functions should begin with',
        "correctAns": 'a “function” keyword',
        "answers": [
    
            'an open and closing parentheses “ ( ) “',
            'a “function” keyword',
            'a parameter',
            'an argumen'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 21,
        "question": 'The function parameter is place in a pair of',
        "correctAns": 'parentheses ( )',
        "answers": [
    
            'curly braces { }',
            'square brackets [ ]',
            'parentheses ( )',
            'quotation mark “ “'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 22,
        "question": 'The function body is place in a pair of',
        "correctAns": 'curly braces { }',
        "answers": [
    
            'curly braces { }',
            'parentheses ( )',
            'square brackets [ ]',
            'quotation mark “ “'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 23,
        "question": 'Functions parameters can be thought of as',
        "correctAns": 'variable',
        "answers": [
    
            'a keyword',
            'a value',
            'function name',
            'variable'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 24,
        "question": 'Functions argument can be thought of as',
        "correctAns": 'a value',
        "answers": [
    
            'a keyword',
            'a value',
            'function name',
            'variable'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 25,
        "question": 'function eat( ) {<br>console.log("rice");<br>}<br><br> What does the above code do when executed?',
        "correctAns": 'it prints rice to the console',
        "answers": [
    
            'it does nothing',
            'it prints rice to the console',
            'it prints eat to to the console',
            'it does both A and C'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 26,
        "question": 'function eat(foodname) {<br>console.log(foodname);<br>}<br> eat("cassava")<br><br> The parameter in the above code is',
        "correctAns": 'foodname',
        "answers": [
    
            'cassava',
            'foodname',
            'eat',
            'console.log(foodname);'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 27,
        "question": 'According to the lesson, functions should do how many things?',
        "correctAns": 'only one thing',
        "answers": [
    
            'two things at a time',
            'only one thing',
            'both A and B',
            'none of the above'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,


    {
        "id": 28,
        "question": 'Functions in JavaScript can only be written',
        "correctAns": 'anywhere in the code',
        "answers": [
    
            'at th top of the code',
            'at the end of the code',
            'anywhere in the code',
            'in the middle of the code'
        ],
        topic: 'javascript',
        status: 'default'
    }
    ,

    {
        "id": 29,
        "question": 'A __ is used to display the last 10 lines of it\"s input.',
        "correctAns": 'tail',
        "answers": [
    
            'head',
            'cat',
            'tail',
            'wc'
        ],
        topic: 'linux',
        status: 'default'
    }
    ,

    {
        "id": 30,
        "question": 'What will be the output of the of command $head -n 4 lenghts.txt ?',
        "correctAns": 'Prints the fist 4 lines',
        "answers": [
    
            'Error',
            'The last 4 lines',
            'Prints the fist 4 lines',
            'Prints all in the lengths.txt'
        ],
        topic: 'linux',
        status: 'default'
    }
    ,

    {
        "id": 31,
        "question": 'What is the difference between a start tag and an end tag?',
        "correctAns": 'An end tag starts with a forward slash.',
        "answers": [
    
            'They are identical',
            'An end tag is capitalized,',
            'An end tag starts with a forward slash.',
            'An end tag is mandatory but a start tag is optional'
        ],
        topic: 'html',
        status: 'default'
    },
    {
        "id": 32,
        "question": 'A function with out a name is called',
        "correctAns": 'Anonymous Function',
        "answers": [
    
            'Regular Function',
            'Fat arrow function',
            'Anonymous Function',
            'None'
        ],
        topic: 'javascript',
        status: 'default'
    }
]
