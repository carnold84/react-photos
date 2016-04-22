var Image = React.createClass({
    displayName: 'Image',


    componentDidMount: function () {

        console.log('Image mounted');
    },

    render: function () {

        var markup, style, title;

        // set title if it exists
        if (this.props.title) {

            title = React.createElement(
                'h3',
                { className: 'image__title' },
                this.props.title
            );
        }

        // use image as a background image style
        style = {
            backgroundImage: 'url(' + this.props.imageUrl + ')'
        };

        // make element a link if it has a callback or a div if not
        if (this.props.callback) {

            markup = React.createElement(
                'a',
                { className: 'image', onClick: this.props.callback, 'data-index': this.props.index, href: '#', style: style },
                title
            );
        } else {

            markup = React.createElement(
                'div',
                { className: 'image', style: style },
                title
            );
        }

        return markup;
    }
});