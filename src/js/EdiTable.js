/**
 * EdiTable (https://github.com/GianlucaChiarani/EdiTable)
 * @version 0.5
 * @author Gianluca Chiarani
 * @license The MIT License (MIT)
 */

(function ($) {
    $.fn.ediTable = async function (options = {}) {
        var settings = $.extend({
            type: 'text',
            options: {
                endpoint: false,
                data: {}
            },
            value: {
                endpoint: false,
                data: {}
            },
            save: {
                method: 'POST',
                endpoint: false,
                data: {}
            },
            saveOnEnter: true,
            saveOnClick: true,
            saveBtn: false
        }, options);

        var value = this.html();

        if (typeof settings.value === 'object') {
            if (settings.value.endpoint) {
                var queryString = '';

                if (Object.keys(settings.value.data).length) {
                    queryString = '?' + new URLSearchParams(settings.value.data)
                }
                
                var res = await fetch(settings.value.endpoint + queryString);
                var realValue = await res.text();
            } else {
                var realValue = value;
            }
        } else {
            var realValue = settings.value;
        }

        var input = '';
        var id = 'et-' + Date.now();

        if (!this.hasClass('et-active')) {
            if (settings.type == 'select') {
                if (settings.options.endpoint) {
                    var queryString = '';

                    if (Object.keys(settings.options.data).length) {
                        queryString = '?' + new URLSearchParams(settings.options.data)
                    }

                    options = await fetch(settings.options.endpoint + queryString);
                    options = await options.json();
                } else {
                    options = settings.options;
                }
            }

            switch (settings.type) {
                case 'textarea':
                    input = '<textarea class="et-input">/textarea>';
                    break;

                case 'select':
                    input = '<select class="et-input">';
                    for (const key in options) {
                        input += '<option class="et-input" value="' + key + '">' + options[key] + '</option>';
                    };
                    input += '</select>';
                    break;

                default:
                    input = '<input class="et-input" type="' + settings.type + '" />';
                    break;
            }

            if (settings.saveBtn) {
                var saveBtn = '<i data-bs-toggle="tooltip" title="Save" class="fa fa-check et-save"></i>';
            } else {
                var saveBtn = '';
            }

            this.addClass('et-active').attr('id', id);
            this.html('<div class="et-container">' + input + saveBtn + '<div class="et-original-value"></div></div>');

            var originalContentEl = this.find('.et-original-value');
            originalContentEl.html(value);

            var inputEl = this.find('input.et-input, select.et-input');

            inputEl.focus().val(realValue);

            if (settings.saveOnEnter) {
                inputEl.on('keypress', function (e) {
                    if (e.which === 13) {
                        saveValue(inputEl, settings);
                    }
                });
            }

            this.find('.et-save').click(function() {
                saveValue(inputEl,settings);
            });
        }

        $(document).on('click', function (e) {
            if (e.target.id != id && e.target.className != 'et-input' && e.target.className != 'fa fa-check et-save') {
                if ($('#' + id + '.et-active').length) {
                    if (settings.saveOnClick)
                        saveValue($('#' + id + ' .et-input'),settings);
                    else
                        printValue($('#' + id + '.et-active'),true);
                }   
            }
        });

        function saveValue(inputEl, settings) {
            settings.save.data.value = inputEl.val();
            inputEl.prop('disabled', true);

            $.ajax({
                method: settings.save.method,
                url: settings.save.endpoint,
                data: settings.save.data,
                dataType: 'html',
                success: function (res) {
                    printValue($('#' + id), false);
                }
            });
        }

        function printValue(el, reset) {
            if (reset) {
                var value = el.find('.et-original-value').html();
            } else {
                var inputEl = el.find('.et-input');

                if (inputEl.is('select'))
                    var value = inputEl.find('option:selected').html();
                else
                    var value = inputEl.val();
            }

            el.removeClass('et-active');
            el.html(value);
        }
    }
}(jQuery));
