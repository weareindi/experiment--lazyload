# Lozyload   
**WIP** *aka "It works but you probably shouldn't use this in production"*

> An experiment to better the standard lazy load.   
**I may fail**.   

---

## What is this?
By now I'm sure we're all aware what a lazy loader is right?   
If not, the common priority of a lazy loader is to defer loading of an element until it is required.   
Images are the main priority here. Why load an image that's not in the viewport? ***Let's wait until it is.***

All techniques I've found so far involve replacing the `src` of an `img` element with a `data-src` to use later on.   

```
<img data-src="image.jpg" width="600" height="400" alt="The image description" />
```   

Great idea, but what about browsers that don't support JavaScript? The images will never load.   

Some clever developer then suggested to wrap the normal `img` element inside a `noscript` element to show the image normally when JavaScript isn't available:


```
<img data-src="image.jpg" width="600" height="400" alt="The image description" />

<noscript>
    <img src="image.jpg" width="600" height="400" alt="The image description" />
</noscript>
```

So now, to cater for both non-JavaScript and JavaScript users we've doubled the amount of img elements on the page? Crazy.   

**Surely there's a better way?**

---

## Project priorities:   
- Progressive enhancement
- Plug and play
- Learn something new

---

## The Theory
As a webpage is loaded the browser starts rendering immediately, from top to bottom. This is cool. This gets things on our screen as soon as possible.   

However, if you now take optimisation into account you soon realise that JavaScript is render blocking.   
This means that any inline script you have embedded at the top of your html will be read before the rest of the document. The best practice would be to move non-essential script to the very end of the document so it loads last (or at the least - take advantage of the [defer/async attributes](https://developer.mozilla.org/en/docs/Web/HTML/Element/script)).   
Great. We're developers. We can **and should** do that.   

With that in mind, my theory would be to write a script that loads and is executed before anything else on the page. We can then listen for changes to the document and check to see if any of those changes were the addition of `img` elements.   
If they were, we process them.

This would allow us to simply drop a 'lazy load' script at the top of the page and not have to worry about replacing the `src` attribute with some phoney `data-src` in every single image we wanted to display.   
Nor would we have to double up our code with the `noscript` wrapped `img` elements to keep the non-JavaScript users visually appeased.   

We could keep our html clean, precise and written how it's supposed to be. **Win.**   

---

## The Script
Actually I surprised myself with how it turned out.   
My theory kind of worked straight out of the box.   

The first attempt included using `requestAnimationFrame` to keep checking the page until the `window.onload` event had fired.   

This worked well with **one major caveat**; `requestAnimationFrame` only works when in focus.   
If you opened the page up in a background tab - the lazyload wouldn't kick in and the whole page would load as if there was no lazyload. *There had to be a better way.*

A quick search revealed the [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver), we can use this to observe the document for changes.   
**Bingo.** This gave the same results whether we loaded the page in a focused or in a background tab.

So with the `MutationObserver` implemented, I checked the network tab to see what was happening and how quickly the multiple `img` elements on my demo page were being processed by the script.   

---

### The Slower The Better
It turns out, on a localhost where everything is loaded without any bandwidth concerns; the first few imgs at the top of the page do start to download and then get cancelled as the lazyload kicks in.   

However, if I start to throttle the connection, the likelihood increases that the lazyload will kick in before anything else starts to load.   

That wasn't the plan but as the script utilises progressive enhancement and ease of use. I feel it's a compromise that I'm happy to live with.   
Looking at that caveat from another angle; if the user has a high speed connection then the lazyload kicking in a few bytes too late probably isn't a big issue to them.   
