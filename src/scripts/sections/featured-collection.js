/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import 'flickity/dist/flickity.min.css';
import Flickity from 'flickity';
import $ from 'jquery';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {
    window.console.log('Initialising featured collection section');
    const elem = document.querySelector('.featured-collection__carousel');
    new Flickity(elem, {
      cellAlign: 'left',
      containe: true,
      groupCells: true,
      imagesLoaded: true,
      wrapAround: true,
      arrowShape: { 
        x0: 25,
        x1: 65, y1: 40,
        x2: 75, y2: 40,
        x3: 35
      },
    });
  },

  quickAdd() {
    const quickAddCta = $('.add-to-Cart');
    quickAddCta.on('click', function(e){
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: {
          quantity: 1,
          id: $(this).data('variant-id')
        },
        dataType: 'json',
        success: function() {
          $.ajax({
            type: 'GET',
            url: '/cart.js',
            dataType: 'json',
            success: function(cart) {
              $('.site-header__cart span').text('(' + cart.item_count + ')'); 
            },
            error: function() {
              console.log('something wrong');
            }
          })
        },
        error: function() {
          console.log('something wrong');
        }
      })
    });
  },

  publicMethod() {
    // Custom public section method
  },

  _privateMethod() {
    // Custom private section method
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
    this.quickAdd();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
