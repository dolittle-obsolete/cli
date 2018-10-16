
export class a_boiler_plate_json {
    constructor() {
        this.boilerPlateJson = `
        {
            "name": "Basic template",
            "language": "csharp",
            "description": "This is a basic boilerplate",
            "type": "boundedContext",
            "dependencies": [],
            "location": "/Users/woksin/.dolittle/boiler-plates/CSharp.BoundedContext/Content",
            "pathsNeedingBinding": [
                "{{name}}.sln"
            ],
            "filesNeedingBinding": [
                "Core/NullBindings.cs",
                "bounded-context.json"
            ]
        }
        `;
    }
}