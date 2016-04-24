var Grid = React.createClass({
    
    render: function() {
        
        var items = this.props.items;
        
        return <div className="grid">
                {items}
            </div>
    }
});