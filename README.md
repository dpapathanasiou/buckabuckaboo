buckabuckaboo
=============

About
-----

This is an unobtrusive, cross-browser compatible javascript plugin for tracking and logging mouse movements on any web page, inspired by a Carnegie Mellon study titled "<a href="http://dl.acm.org/citation.cfm?id=634067.634234" target="_blank">What can a mouse cursor tell us? Correlation of eye/mouse movements on web browsing</a>" (<a href="http://csi.ufs.ac.za/resres/files/Chen.pdf" target="_blank">PDF</a>) which observed that:

> The study showed that 84% of the times that a region was visited by a mouse cursor, it was also visited by (users') eye gaze. In addition, 88% of regions that were not gazed by the eye were also not visited by a mouse cursor.

Usage
-----

Install the buckabuckaboo folder from this repo on a web server you control, and make the folder contents publically-accessible.

On every web page in which you wish to track visitor mouse movements, add this code in the document body.

Replace the script src with the fully qualified domain name and path of your server which hosts the buckabuckaboo.min.js script, and, into the BUCKA.init() function, pass the fully qualified domain name and path to where your server hosts the '1x1.gif' file (if you import the folder to your server as-is, they will be the same path, as is shown here):

```
<script src="http://www.example.org/buckabuckaboo/buckabuckaboo.min.js"></script>
<script type="text/javascript">
    BUCKA.init( 'http://www.example.org/buckabuckaboo' );
</script>
```

The site being monitored and the site hosting the buckabuckaboo folder can be different domains, since a simple hack using javascript's <a href="https://developer.mozilla.org/en-US/docs/DOM/HTMLImageElement" target="_blank">Image object</a> gets around the <a href="https://en.wikipedia.org/wiki/Same_origin_policy" target="_blank">same origin restriction</a> that would otherwise prevent this setup from working.

The web server logs will contain entries containing references to the '1x1.gif' file, with trailing parameters containing the (x,y) coordinates of each mouse movement, along with the browser window width and height (h,w) sizes, and the specific location from where the mouse movements were obtained as an encoded url (src).

Thus, you can project the specific coordinates onto any size snapshot of the page in question:

```
"GET /buckabuckaboo/1x1.gif?x=781&y=25&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200
```

In the above example, the user's mouse was tracked on the page (src='http://example.com' -- this value has been url-encoded) as being at coordinate position (x=781, y=25) on a browser window whose total width and height were (w=1366, h=682).

Depending on the web server software you are using and how it is configured, you can grep and sort the web log entries for the '1x1.gif' file by client ip address, and date/time, etc.

Source
------

The only files in the buckabuckaboo folder you need to deploy to your server are the '1x1.gif' and 'buckabuckaboo.min.js' files, the latter being a minified version of the buckabuckaboo.js source file (using Google's <a href="https://code.google.com/p/closure-compiler/" target="_blank">Closure Compiler</a>).

Example
-------

To test the files in this repo in your local environment, open a terminal and use python's <a href="http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python" target="_blank">Simple HTTP Server</a>:

```
$ python -m SimpleHTTPServer
```

Open a web browser and visit '127.0.0.1:8000'. You should see the test page, complete with photos of our with our friend Mr. Van Winkle. Move your mouse on the page, and the terminal should fill up with entries like this (your actual x,y,h,w values will be different):

```
127.0.0.1 - - [12/May/2013 19:31:30] "GET /buckabuckaboo/1x1.gif?x=423&y=109&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:30] "GET /buckabuckaboo/1x1.gif?x=483&y=129&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:30] "GET /buckabuckaboo/1x1.gif?x=540&y=147&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:34] "GET /buckabuckaboo/1x1.gif?x=572&y=144&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:34] "GET /buckabuckaboo/1x1.gif?x=620&y=116&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:34] "GET /buckabuckaboo/1x1.gif?x=641&y=105&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:34] "GET /buckabuckaboo/1x1.gif?x=730&y=72&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:34] "GET /buckabuckaboo/1x1.gif?x=796&y=54&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:41] "GET /buckabuckaboo/1x1.gif?x=785&y=51&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:44] "GET /buckabuckaboo/1x1.gif?x=1168&y=74&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:44] "GET /buckabuckaboo/1x1.gif?x=1168&y=57&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:47] "GET /buckabuckaboo/1x1.gif?x=1119&y=224&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
127.0.0.1 - - [12/May/2013 19:31:47] "GET /buckabuckaboo/1x1.gif?x=1070&y=203&w=1366&h=682&src=http%3A%2F%2Fexample.com HTTP/1.1" 200 -
```

Using the Data
--------------

While there are many different ways to analyze the data, one interesting thing to do is create an animated sequence of lines charting mouse movements by different web site visitors.

This mimics how each person "saw" your page, and where their eyes were focused.

Here are some sample videos using a selection of sanitized data obtained from two different web pages both using this plugin:

* <a href="http://www.youtube.com/watch?v=PziyvSHgkBs" target="_blank">eBookBurn.com</a>
* <a href="http://www.youtube.com/watch?v=n6npG9NHg7E" target="_blank">Macaronics.com</a>

These animations were created as plots in <a href="http://www.r-project.org/" target="_blank">R</a>, using the <a href="https://gist.github.com/dpapathanasiou/5818427" target="_blank">code in this gist</a>, and recorded as video using <a href="http://tech.journalism.cuny.edu/documentation/capture-video-with-quicktime-screen-recording/" target="_blank">QuickTime's Screen Recording</a> feature.

Acknowledgements
----------------

* <a href="https://twitter.com/jeresig" target="_blank">John Resig</a> for his <a href="http://ejohn.org/projects/flexible-javascript-events/" target="_blank">cross-browser event listener</a> example
* <a href="http://andylangton.co.uk" target="_blank">Andy Langton</a> for his <a href="http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript" target="_blank">cross-browser viewport height and width calculator</a>
* <a href="https://twitter.com/paultoo" target="_blank">Paul Buchheit</a> for the javascript <a href="https://developer.mozilla.org/en-US/docs/DOM/HTMLImageElement" target="_blank">Image object</a> hack which gets around the <a href="https://en.wikipedia.org/wiki/Same_origin_policy" target="_blank">same origin restriction</a>, based on the <a href="https://news.ycombinator.com/item?id=4239118" target="_blank">Hacker News voting code</a> he wrote for <a href="https://news.ycombinator.com/" target="_blank">https://news.ycombinator.com/</a> 
