Nunjucks error reporting issue
===

Short version
---

Inserting the line `{{ "testing" | thisFilterDoesNotExist }}` to `views/index.html` reports the wrong line number.  Generally Nunjucks will report the line above `{% block %}` declaration that the erroring line is contained within.  If it's after an include Nunjucks will report the include as the problem.  This can be replicated by inserting it as lines 5, 7, 15, 17 and 19.

Long version
---

I work on the GOV.UK Prototype Kit team, we provide a tool for users with a whole range of technical abilities.  We use Nunjucks with Express.

While investigating how to nicely present errors to our users and we realised that Nunjucks incorrectly reports line numbers in some circumstances.  This is repeatable so I created [an example on Github](https://github.com/nataliecarey/nunjucks-error-example).

Before recreating the issue clone the project and make sure everything is running using:

```
git clone git@github.com:nataliecarey/nunjucks-error-example.git
cd nunjucks-error-example
npm install
npm start
```

Then follow the URL that is shown in the terminal.

You should see a page with two sections and plenty of Lorum Ipsum placeholder text.

Now it's time to break it.
---

Add the following line to different parts of `views/index.html` and look at the line number that the error is reported on:

```
{{ "testing" | thisFilterDoesNotExist }}
```

 - If we add it on line 5 it says the error occurred on line 2.
 - If we add it on line 7 it still says the error occurred on line 2.
 - If we add it on line 15 it says the error occurred on line 12.
 - If we add it on line 17 it still says the error occurred on line 12.

It becomes more interesting when we get further down.

- If we add it on line 19 it says the error occurred inside the include (which was included on line 18).
- If we add it on line 21 it still says the error occurred inside the include.

When we try to highlight the line on which the error occurred we're pointing the user in the wrong direction.  This comes from a bug inside Nunjucks which I hope to raise a fix for.
