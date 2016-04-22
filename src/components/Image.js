var Image = React.createClass({
    
    componentDidMount : function () {
        
        console.log('Image mounted');
    },
    
    render : function () {
        
        var markup,
            style,
            title;
        
        if (this.props.title) {
            
            title = <h3 className="image__title">{this.props.title}</h3>;
        }
        
        style = {
            backgroundImage : 'url(' + this.props.imageUrl + ')'
        };
        
        if (this.props.callback) {
            
            markup = <a className="image" onClick={this.props.callback} data-index={this.props.index} href="#" style={style}>
                        {title}
                    </a>;
                
        } else {
            
            markup = <div className="image" style={style}>
                        {title}
                    </div>;
        }
        
        return markup;
    }
});