---
layout: post
title: Creating Jekyll Template
permalink: /jekyll-template.html
category: dev
summary: This is summary for my post! Here I'm posting about software engineering. You can find updates on projects I am working on as well as my writings devoted to the technical aspect. Here I'm posting about software engineering. You can find updates on projects I am working on as well as my writings devoted to the technical aspect.
---

I learned about [Jekyll](https://jekyllrb.com/) not long ago, but I was instantly fascinated by the way it allows creating good looking HTML blogs from plain .md files in an instance of a second. Planning to create a personal website using [GitHub Pages](https://pages.github.com/) I couldn't resist diving deeper into Jekyll and creating my own theme. It wasn't like it was a necessity, there are a lot of great looking templates available, but I wanted to see how they were made and how complicated was the process of it, and man, was it simple!

Combining the power of static websites with [Liquid](https://shopify.github.io/liquid/) language and conventions of Jekyll makes for a fun time creating with this stack. In this post I'm not going to explain step by step how to make a brand new theme, because there is already a ton of great tutorials about that (for example [this one](https://medium.com/@jameshamann/creating-your-own-jekyll-theme-gem-1f8180a0e4b8)), but rather, I'm going to focus on what unique issues I've encountered. I'm going to talk in the context of my own theme, named _minimal-categorized_, which (most probably) this very blog is written in, and which is available on [GitHub](https://github.com/ItsMeaga1n/minimal-categorized/).

First thing after executing command for creating new blank theme with `jekyll new-theme minimal-categorized` was testing what was shipped with clean template. Instead of creating a new website using this newly created theme, I put some example posts and entries in `_config.yml` so that I could launch demo website from the very same folder as the theme was in, so I could develope and see changes at the same time. Once I was able to run theme demo with `bundle exec jekyll serve`, I started tweaking around.

I wanted my website to have two main domains, which could be entered via the homepage by "gateways" and would be like two separate blogs, connected to each other only by the menu. To do this, I had to break a bit with the standard convention so I could create two separate points of aggregation which would be for posts of category A and for posts of category B. In the root directory, alongside folders like `_layouts` and `_posts` I've created directory `pages` which is used to store websites files for specific categories main page. To make them a little bit more consistent, all category aggregators are using the same layout and have a _category_ attribute, which is used by this layout to filter the correct posts for each of the categories. The folder `pages` couldn't start with underscore, because otherwise, it wouldn't be considered a part of a remote theme.

Keeping in mind the possibility of expanding on this idea, I wanted the theme to be as generic as possible. To do this, I decided to keep all of the information about the domain in yaml files, so that everything could be overridden. In the root directory I created folder named `_data`, in which are stored separate _.yml_ files for each modular part of the website. As for now, there are two files:
* `menu.yml`, containing information about the menu structure, as well as the separation of the categories
* `metaData.yml`, containing information about meta data.

While publishing this theme on its own project GitHub Pages, I encountered a problem with links - because the theme base URL is _https://itsmeaga1n.github.io/minimal-categorized/_, the slash at the start of links would redirect to the main pages domain (eg. permlink looking like /category-1.html was linking to not existing _https://itsmeaga1n.github.io/category-1.html_ instead of _https://itsmeaga1n.github.io/minimal-categorized/category-1.html_). I changed all the links inside the template to use [relative_url](https://talk.jekyllrb.com/t/relative-url-and-baseurl/2051), and so from:
```html
<a href="{{ "{{ menu_item.url " }}}}" class="category-container">
```
I transformed the markup to:
```html
<a href="{{ "{{ menu_item.url | relative_url " }}}}" class="category-container">
```

Finally, as a newbie to Ruby language, I wanted to try myself out in publishing this theme as a separate Gem. It came out to be pretty easy - after filling **.gemspec**, addressing versioning and creating an account at [rubygem](https://rubygems.org/) all that was left to do was to execute two commands:
```shell
# bash
$ gem build THEME_NAME.gemspec
$ gem push THEME_NAME-*.gem
```
To update the gem, three steps are needed:
* the version of the theme in gemspec file has to be bumped 
* outdated *.gem files need to be deleted
* two former commands are enough to publish the update.

Thanks to that there are three major ways of using this theme: 
* By adding minimal-categorized to Gemfile and setting it in `_config.yml` as `theme: minimal-categorized`,
* By setting remote-theme in `_config.yml` to GitHub repository as `remote_theme: ItsMeaga1n/minimal-categorized`,
* By downloading entire repository from GitHub and working on it

During my search for information about Jekyll, I encountered a very useful [styleguide](https://github.com/benbalter/jekyll-style-guide), which might help those who are starting their adventure with this tool. Overall, as for great results, I think creating new Jekyll theme is surprisingly easy and entertaining.