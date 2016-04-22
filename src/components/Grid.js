var Grid = React.createClass({
    
    componentDidMount : function () {
        
        console.log('Grid mounted');
    },
    
    render: function() {
        
        var items = this.props.items;
        
        return <div className="grid">
                {items}
            </div>
    }
});