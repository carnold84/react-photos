var Image = React.createClass({
    displayName: 'Image',


    componentDidMount: function () {

        console.log('Image mounted');
    },

    render: function () {

        var markup, style, title;

        if (this.props.title) {

            title = React.createElement(
                'h3',
                { className: 'image__title' },
                this.props.title
            );
        }

        style = {
            backgroundImage: 'url(' + this.props.imageUrl + ')'
        };

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