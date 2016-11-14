# Spinline jQuery plugin

Use Youtube-style ajax loading spinner.

It looks as a line that automatically increases but never reaches the end.

So you can start it on ajax request and finish when request finished.

The main difference from already existing this type of plugins is that it can be positioned not only on the top of the block or page but also at the bottom.

It doesn't cover any of your elements. Very easy to use and looks cool.

## Installation

#### NPM

```bash
npm install spinline
```

#### Bower

```bash
bower install spinline
```

#### Manually

Just download the package and attach spinline.jquery.js script to your page.

```html
<script src="spinline.jquery.js"></script>
```

## Usage

Siple usage examples:

```javascript
$(selector).spinline('start');

$(selector).spinline('start', {
    position: 'bottom',
    color: '#00ff00'
});

$(selector).spinline('set', '50%');
```

### Actions

 - `start` - Attach spinner to the element and start movement
 - `finish` - Increase spinner till the end and remove
 - `pause` - Stop the movement of the spinner but still display it
 - `proceed` - Continue paused spinner
 - `remove` - Remove spinner
 - `set` - Manually set the width of spinner. Requires the second parameter as a percentage from entire block.
 - `get` - Get current spinner data and current width. Always returns array of objects.
 
### Parameters

```javascript
{
    // Thickness of spinner
    height: '2px',
    
    // Color of spinner
    color: '#ff0000',
    
    // The width that will be set on start
    initialWidth: '5%',
    
    // How often to move the spinner
    frequency: 500,
    
    // Step in percent to increase spinner on every move
    step: 3,
    
    // Where to attach spinner
    position: 'bottom'
    
    // z-index attribute of spinner
    zIndex: 1
}
```

### Events

`spinline:started` - Triggered when spinner initially started

`spinline:paused` - Triggered when spinner paused

`spinline:proceed` - Triggered when spinner received command to continue movement

`spinline:proceeded` - Triggered if spinner continued movement

`spinline:finished` - Triggered when spinner finished

`spinline:removed` - Triggered when spinner removed

## Contributions

Contributions are highly appreciated.

Send your pull requests to `master` branch.


## License

The MIT License (MIT). Please see [License File](https://github.com/garf/spinline/blob/master/LICENSE) for more information.


