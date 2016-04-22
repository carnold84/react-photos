var Slide = React.createClass({
    displayName: 'Slide',


    componentDidMount: function () {

        console.log('Slide mounted');
    },

    render: function () {

        var style = {
            backgroundImage: 'url(' + this.props.imageUrl + ')'
        };

        return React.createElement('div', { className: 'slide', style: style });
    }
});