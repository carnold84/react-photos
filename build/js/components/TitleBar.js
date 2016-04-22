var TitleBar = React.createClass({
    displayName: "TitleBar",


    componentDidMount: function () {

        console.log('TitleBar mounted');
    },

    onBackClick: function (evt) {

        this.props.callback();

        evt.preventDefault();
    },

    render: function () {

        return React.createElement(
            "header",
            { className: "title-bar" },
            React.createElement("a", { className: "title-bar__back-btn", href: "#", onClick: this.onBackClick, title: "Back" }),
            React.createElement(
                "h2",
                { className: "title-bar__title" },
                React.createElement(
                    "span",
                    { className: "title-bar__title-inner" },
                    this.props.title
                )
            )
        );
    }
});