import { a_boiler_plate_json } from './given/a_boiler_plate_json'
import { BoilerPlate } from '../../BoilerPlate';
describe('when parsing a boiler plate json back and forth', () => {
    let context = new a_boiler_plate_json();
    let boilerPlateObject = {};
    let jsonResult = '';
    (beforeEach => {
        boilerPlateObject = JSON.parse(context.boilerPlateJson);
        let boilerPlateResult = new BoilerPlate(
            boilerPlateObject.language,
            boilerPlateObject.name,
            boilerPlateObject.description,
            boilerPlateObject.type,
            boilerPlateObject.dependencies,
            boilerPlateObject.location,
            boilerPlateObject.pathsNeedingBinding || [],
            boilerPlateObject.filesNeedingBinding || []);
        jsonResult = boilerPlateResult.toJson();
    })();
    console.log(jsonResult);
    console.log(JSON.parse(context.boilerPlateJson));
    it('should have the same name', () => jsonResult.name.should.equal(boilerPlateObject.name));
    it('should have the same language', () => jsonResult.language.should.equal(boilerPlateObject.language));
    it('should have the same description', () => jsonResult.description.should.equal(boilerPlateObject.description));
    it('should have the same type', () => jsonResult.type.should.equal(boilerPlateObject.type));
    it('should have the same dependencies', () => jsonResult.dependencies.should.equal(boilerPlateObject.dependencies));
    it('should have the same location', () => jsonResult.location.should.equal(boilerPlateObject.location));
    it('should have the same pathsNeedingBinding', () => jsonResult.pathsNeedingBinding.should.equal(boilerPlateObject.pathsNeedingBinding));
    it('should have the same filesNeedingBinding', () => jsonResult.filesNeedingBinding.should.equal(boilerPlateObject.filesNeedingBinding));
});