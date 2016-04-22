var Grid = React.createClass({
    displayName: "Grid",


    componentDidMount: function () {

        console.log('Grid mounted');
    },

    render: function () {

        var items = this.props.items;

        return React.createElement(
            "div",
            { className: "grid" },
            items
        );
    }
});