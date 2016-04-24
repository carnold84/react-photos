var Slide = React.createClass({
    
    render : function () {
        
        var style = {
            backgroundImage : 'url(' + this.props.imageUrl + ')'
        };
        
        return <div className="slide" style={style} />;
    }
});