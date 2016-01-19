#Grunt Email Workflow

A template to create responsive HTML mails that render well on desktop, web and mobile clients like Gmail, Outlook, Apple Mail, Yahoo Mail, ... The Grunt workflow simplifies the process:
  1. Creates local server with auto reload
  2. Builds your HTML email from predefined JADE template
  3. Template structure allows you to easily create different versions of 1 email 
  4. Compiles LESS to CSS that is automatically inlined
  5. Minifies images and creates ZIP packages
  6. Creates starting point for a text version of your mailing

##Installation

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [getting started](http://gruntjs.com/getting-started) guide. Open terminal and install Grunt command line interface globally. You may need to use sudo.
```
npm install -g grunt-cli
```

Install Grunt Dependencies.
```
npm install
```

##Commands

Use the grunt dev command to develop your EDM. This task will build your EDM and start a local server with livereload. This is the default task.
```
grunt dev
```

You can add the flag "gmail" to generate the mail without media query optimizations, similar to how Gmail renders mail.
```
grunt dev --gmail
```

Use the grunt build command to only build the EDM.
```
grunt build
```

Use the grunt export command to build the EDM, export a ZIP and generate a TXT.
```
grunt export
```

##Structure

###JADE/HTML
The HTML is compiled from the JADE files. For each JADE file in the root of the src folder there will be one EDM package created.

- **src/*.jade**: This is the EDM specific level. If you have small differences like a corporate footer and a standard footer you should differenciate this content in these JADE files.
- **src/languages/*.jade**: This is the language specific level. Collect all the language specific content in these JADE files.
- **src/layouts/content.jade**: This JADE file contains the structure of the content of you EDM.
- **src/layouts/base.jade**: This JADE file connects all JADE files and contains the structure of the final HTML files.
- **src/layouts/mixins/*.jade**.jade: These JADE files contains mixins used in other JADE files.
- **src/layouts/variables.jade**: This JADE file contains the default variables for JADE files.

###LESS/CSS
The CSS is compiled from the LESS files. All CSS in inline.less is inlined in the emailBuilder Grunt task. All CSS in head.less and head-default.less is placed in the head of the final HTML files.

- **src/less/inline.less**: All this CSS is inlined in the emailBuilder Grunt task. Custom inline styles should be placed here.
- **src/less/inline-default.less**: All this CSS is inlined in the emailBuilder Grunt task. This LESS file is meant for default inline styles.
- **src/less/head.less**: All this CSS is placed in the head of the final HTML files. Custom head styles should be placed here.
- **src/less/head-default.less**: All this CSS is placed in the head of the final HTML files. This LESS file is meant for default head styles.
- **src/less/mixins.less**: This LESS file contains mixins used in other LESS files.
- **src/less/variables.less**: This LESS file contains the default variables for LESS files.

##Variables

###layouts/variables.jade
It is advised to override variables in your JADE files in the root and languages folder of the src folder.

- **title**: The title used in the title tag and meta tags. A maximum of 70 characters advised.
- **description**: The description used in meta tags and preview text. A maximum of 160 characters advised.
- **deployUrl**: URL where EDM will be hosted.
- **shareImg**: URL of the image to be shared on social media.
- **language**: Defines the language of the disclaimer and legal lines.
- **legal**: Defines the type of legal lines you want.
- **maxWidth**: The maximum width of the EDM.
- **defaultPadding**: The default padding.

###less/variables.less
All your less variables are defined in the file itself.

##Sources
- [Envato article](http://webdesign.tutsplus.com/tutorials/creating-a-future-proof-responsive-email-without-media-queries--cms-23919): The template is based on the examples in this article
- [Campaign Monitor](https://www.campaignmonitor.com/css/): CSS support overview
- [Jade inheritance](https://github.com/paulyoung/jade-inheritance): Reduce compilation time for Jade files by understanding inheritance
