var generators = require("yeoman-generator");

module.exports = generators.Base.extend({

    // user prompts
    prompting: function() {
        
        var done = this.async();
        
        var prompts = [
            {
                type: "input",
                name: "application",
                message: "What is your application name?",
                default: this.appname // default to current folder name appname value is specific to the API
            },
            {
                type: "list",
                name: "theme",
                message: "Which theme do you want to use?",
                choices: ["dark", "light"],
                default: this[0] // default to first option in list
            }
        ];
        
        this.prompt(prompts, function(answers) {
                        
            // assign answer variables to use in templating
            this.appName = answers.application;
            this.themeName = answers.theme;
            
            done();
            
        }.bind(this));
        
    },
    
    // copy files create app structure
    writing: function() {
        
        // index
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("www/index.html"),
            {
                appName: this.appName
            }
        );
        
        // fav icon
        this.fs.copyTpl(
            this.templatePath("assets/favicon.ico"),
            this.destinationPath("www/assets/favicon.ico")
        );
        
        // css reset
        this.fs.copyTpl(
            this.templatePath("css/reset.css"),
            this.destinationPath("www/css/reset.css")
        );
        
        // css main global structural items
        this.fs.copyTpl(
            this.templatePath("css/main.css"),
            this.destinationPath("www/css/main.css")
        );
        
        // light/dark theme
        this.fs.copyTpl(
            this.templatePath("css/" + this.themeName + ".css"),
            this.destinationPath("www/css/"  + this.themeName + ".css")
        );
        
        // app specific structural items
        this.fs.copyTpl(
            this.templatePath("css/app.css"),
            this.destinationPath("www/css/" + this.appName + ".css"),
            {
                appName: this.appName,
                themeName: this.themeName
            }
        );
        
        // angular js
        this.fs.copyTpl(
            this.templatePath("js/app.js"),
            this.destinationPath("www/js/app.js")
        );
        
        // angular controllers
        this.fs.copyTpl(
            this.templatePath("js/controllers.js"),
            this.destinationPath("www/js/controllers.js")
        );
        
        this.fs.copyTpl(
            this.templatePath("js/controllers/viz-controller.js"),
            this.destinationPath("www/js/controllers/viz-controller.js")
        );
        
        this.fs.copyTpl(
            this.templatePath("js/controllers/main-controller.js"),
            this.destinationPath("www/js/controllers/main-controller.js")
        );
        
        // angular directives
        this.fs.copyTpl(
            this.templatePath("js/directives.js"),
            this.destinationPath("www/js/directives.js")
        );
        
        // angular services
        this.fs.copyTpl(
            this.templatePath("js/services.js"),
            this.destinationPath("www/js/services.js")
        );
        
        this.fs.copyTpl(
            this.templatePath("js/services/d3-service.js"),
            this.destinationPath("www/js/services/d3-service.js")
        );
        
        this.fs.copyTpl(
            this.templatePath("js/services/data-service.js"),
            this.destinationPath("www/js/services/data-service.js")
        );
        
        // angular html templates
        this.fs.copyTpl(
            this.templatePath("html/viz.html"),
            this.destinationPath("www/templates/viz.html")
        );
        
        this.fs.copyTpl(
            this.templatePath("html/main.html"),
            this.destinationPath("www/templates/main.html")
        );
        
        // dummy data
        this.fs.copyTpl(
            this.templatePath("data/flare.json"),
            this.destinationPath("www/data/flare.json")
        );
        
        this.fs.copyTpl(
            this.templatePath("data/nodeLink.json"),
            this.destinationPath("www/data/nodeLink.json")
        );
		
		// express server
        this.fs.copyTpl(
            this.templatePath("app.js"),
            this.destinationPath("app.js")
        );
		
		this.fs.copyTpl(
            this.templatePath("routes/index.js"),
            this.destinationPath("routes/index.js")
        );
        
    },
    
    // alert user
    end: function() {
        this.log("Generator is done!");
    }/*,
    
    // install local to project
    install: function() {
        
        // npm & bower installation
        this.installDependencies();
        
    }*/
    
});