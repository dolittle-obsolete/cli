import global from '../global'

const customNamespaceChoice = 'Write custom namespace';

function generatedNamespaceQuestion(namespace) {
    return {
        type: 'list',
        name: 'namespace',
        message: `Choose or create namespace:`,
        choices: [
            `${namespace}`,
            customNamespaceChoice
        ]
    }
};

const inputNamespaceQuestion =
{
    type: 'input',
    name: 'namespace',
    message: `Enter the Aggregate Root's namespace`,
    when: function(answers) {
        return answers.namespace === customNamespaceChoice;
    }
};


class cSharpInquirerQuestions {
    getCSharpQuestions() {
        let questions = [];
        
        const namespace = global.createCSharpNamespace(process.cwd(), global.getNearestCsprojFile());
    
        questions.push(generatedNamespaceQuestion(namespace));
        questions.push(inputNamespaceQuestion);
        
        return questions;
    }
}

export default new cSharpInquirerQuestions();