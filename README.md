# rotorflight-docs

rotorflight-docs is the repository for [rotorflight.org](https://www.rotorflight.org/) and is  made with [Docusaurus](https://docusaurus.io/). Docusaurus is a static-site generator using React and renders the [markdown](https://www.markdownguide.org/) documentation pages.

The Rotorflight documentation is versioned, so each version of Rotorflight has its own documentation. The versioned documents can be found in `/versioned_docs`. However, the upcoming *Dev* version is stored under `/docs`.

# How to run rotorflight-docs on your machine

First install Node.js on your machine, either by downloading the latest or by using NVM (Node Version Manager). Then:

```
> git clone https://github.com/rotorflight/rotorflight-docs
> cd rotorflight-docs
> npm install
```

Copy the `example.env` file to `.env`. The example file contains sane defaults for local development, but you can review and change them to your liking:

```
 cp example.env .env
```

Then you can start the development server:

```
npm run start
```

This will start the development server. Also, your browser wil open http://localhost:3000/, where you can view and test the website. If you now edit and save a markdown file in `/versioned_docs`, the changes will automatically show up in your browser.

## Build and test the complete site

You can also build the complete site and test it locally.

```
> npm run build
> npm run serve
```

This will create a `/build` directory, which contains the complete website.

### Faster build

Optionally you can provide a `FASTER=true` environment variable to use the new swc based build system, which is much faster than the default webpack based build system. More info in this [blog post](https://docusaurus.io/blog/releases/3.6#docusaurus-faster).

## Adding missing terminology

The project uses cspell to check spelling in documentation and source files. If
cspell reports a valid Rotorflight term, product name, acronym, or other
project-specific word as misspelled, add it to `project-words.txt`.

Add one term per line, keep the list alphabetically sorted where practical, and
prefer the exact casing used in the documentation. After updating the file, run:

```
npm run spellcheck:all
```
