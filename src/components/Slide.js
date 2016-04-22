var Slide = React.createClass({
    
    componentDidMount : function () {
        
        console.log('Slide mounted');
    },
    
    render : function () {
        
        var style = {
            backgroundImage : 'url(' + this.props.imageUrl + ')'
        };
        
        return <div className="slide" style={style} />;
    }
});