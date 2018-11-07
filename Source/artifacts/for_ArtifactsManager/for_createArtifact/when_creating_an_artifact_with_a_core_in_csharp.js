import { a_system_that_can_find_an_artifact_template_for_csharp } from './given/a_system_that_can_find_an_artifact_template_for_csharp';
describe('when_creating_an_artifact_with_a_core_in_csharp', () => {
    let context = new a_system_that_can_find_an_artifact_template_for_csharp();
    const path = require('path');

    (beforeEach => {
        context.artifactsManager.createArtifact(context.context);
    })();
    
    it('should try getting bounded context configuration from the correct start path', () => context.boundedContextManager.getNearestBoundedContextConfig.should.be.calledWith(context.context.destination));
    it('should try getting an artifacts boiler plate for csharp', () => context.boilerPlatesManager.boilerPlatesByLanguageAndType.should.be.calledWith(context.boilerPlateLanguage, context.boilerPlateType));
    it('should try searching the file system from the location specified in the boilerplate', () => context.folders.searchRecursive.should.be.calledWith(context.boilerPlateLocation));
    it('should try reading the file system from the location of the template file', () => context.fileSystem.readFileSync.should.be.calledWith(path.join(context.templateFileLocation, 'template.json')));
    it('should call the inquirer to prompt the user given the correct information', () => context.inquirerManager.promptUser.should.be.calledWith(context.context.artifactName, context.context.destination, context.boilerPlate, JSON.parse(context.artifactTemplateJson)));
});