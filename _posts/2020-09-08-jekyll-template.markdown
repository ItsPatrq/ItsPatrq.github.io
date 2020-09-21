---
layout: post
title: Creating Jekyll template
permalink: /jekyll-template.html
category: dev
summary: This is summary for my post! Here I'm posting about software engineering. You can find updates on projects I am working on as well as my writings devoted to the technical aspect. Here I'm posting about software engineering. You can find updates on projects I am working on as well as my writings devoted to the technical aspect.
---

I've learned about [Jekyll](https://jekyllrb.com/) not long ago, but I was instantly fascinated by the way it allows creating good looking HTML blogs from plain .md files in an instance of a second. Planning to create an [GitHub Pages](https://pages.github.com/) I couldn't resist driving deeper into Jekyll and creating my own theme. Not like if it was necessary, there are a lot of great looking templates available, but I wanted to see how they are made, and man was it simple.

Combined the power of static websites with [Liquid](https://shopify.github.io/liquid/) and ways of Jekyll makes for a fun time creating with this stack. I'm not going to explain step by step how to make a brand new theme, already there are a lot of great tutorials about that (for example [this one](https://medium.com/@jameshamann/creating-your-own-jekyll-theme-gem-1f8180a0e4b8)), but rather what unique issues did I come across. I'm going to talk in the context of my theme, named _minimal-categorized_, which (most probably) this very blog is written in, and which is available on [GitHub](https://github.com/ItsMeaga1n/minimal-categorized/).

First thing after executing command for creating new blank theme with `jekyll new-theme minimal-categorized` I wanted to test what was shipped with clean template. Instead of creating new website using this newly created theme, I put some example posts and positions in `_config.yml` so that I could launch example website from the very same folder as the theme was in. Once I was able to run theme demo with `bundle exec jekyll serve`, I started tweaking around.

I wanted my website to have two main domains, which could be entered via the homepage by _"gateways"_ and would be like two separate blogs, connected to each other only by the frame. To do this, I had to break a bit with the standard convention so I could create two separate points of aggregation for posts of category A and for posts of category B. In the root directory, alongside directories like `_layouts` and `_posts` I've created folder `pages` which contains websites for specific categories. To make them a little bit more consistent, all category aggregators are using the same layout and should have a _category_ attribute, which is used by this layout to filter the correct posts for each of the categories. The folder `pages` couldn't start with underscore, because otherwise it was not considered if used as a remote theme.

While publishing theme on it's own project GitHub Pages I encountered problem with links - because of the fact, that the theme base URL is _https://itsmeaga1n.github.io/minimal-categorized/_ the slash in links would redirect to the main pages domain (eg. permlink looking like /category-1.html was linking to not existing _https://itsmeaga1n.github.io/category-1.html_ instead of _https://itsmeaga1n.github.io/minimal-categorized/category-1.html_). I changed all link inside template to use [realative_path](https://talk.jekyllrb.com/t/relative-url-and-baseurl/2051), and so from:
```html
<a href="{{ "{{ menu_item.url " }}}}" class="category-container">
```
I switched to links like:
```html
<a href="{{ "{{ menu_item.url | relative_url " }}}}" class="category-container">
```

Finally, as a newbie to Ruby language, I wanted to try myself out in publishing this theme as an separate Gem. It came out to be pretty easy - after filling **.gemspec**, addressing versioning and creating account at [rubygem](https://rubygems.org/) all that was left to do was execute two commands:
```shell
# bash
$ gem build minimal-categorizedTHEME.gemspec
$ gem push minimal-categorized.gem
```
Thanks to that there are three major ways of using this theme: 
* By adding minimal-categorized to Gemfile and setting it in `_config.yml` as `theme: minimal-categorized`,
* By setting remote-theme in `_config.yml` to GitHub repository as `remote_theme: ItsMeaga1n/minimal-categorized`,
* By downloading entire repository from GitHub and working on that

Overall, as for great result I think creating new Jekyll theme is fairly easy and surprisingly entertaining.