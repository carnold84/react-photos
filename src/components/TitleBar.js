var TitleBar = React.createClass({
    
    componentDidMount : function () {
        
        console.log('TitleBar mounted');
    },
    
    onBackClick : function (evt) {
        
        this.props.callback();
        
        evt.preventDefault();
    },
    
    render: function() {
        
        return <header className="title-bar">
                <a className="title-bar__back-btn" href="#" onClick={this.onBackClick} title="Back" />
                <h2 className="title-bar__title">
                    <span className="title-bar__title-inner">{this.props.title}</span>
                </h2>
            </header>;
    }
});