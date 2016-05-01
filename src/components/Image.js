var Image = React.createClass({
    
    render : function () {
        
        var markup,
            style,
            title = this.props.title,
            title_markup;
        
        // set title if it exists
        if (title !== undefined && title !== "") {
            
            title_markup = <h3 className="image__title">{this.props.title}</h3>;
        }
        
        // use image as a background image style
        style = {
            backgroundImage : 'url(' + this.props.imageUrl + ')'
        };
        
        // make element a link if it has a callback or a div if not
        if (this.props.callback) {
            
            markup = <a className="image" onClick={this.props.callback} data-index={this.props.index} href="#" style={style}>
                        {title_markup}
                    </a>;
                
        } else {
            
            markup = <div className="image" style={style}>
                        {title_markup}
                    </div>;
        }
        
        return markup;
    }
});