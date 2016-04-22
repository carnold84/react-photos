var ReactPhotos = React.createClass({
    
    constants : {
        appStates : {
            albums : 'albums',
            photos : 'photos',
            photo : 'photo'
        }
    },
    
    getInitialState : function () {
        
        return {
            appState : this.constants.appStates.albums,
            albums : undefined
        }
    },
    
    componentDidMount : function () {
        
        var update = this.update;
        
        fetch(this.props.source, {
            
            method : 'get'
            
        }).then(function(response) {

            return response.json();
            
        }).then(function (data) {
            
            console.log(data);
            
            update(data.albums);
            
        }).catch(function(err) {
            // Error :(
        });
    },
    
    update : function (data) {
        
        this.setState({
            albums : data
        });
    },
    
    onAlbumClick : function (evt) {
        
        var album_index = evt.currentTarget.getAttribute('data-index'),
            album;
        
        if (album_index !== undefined) {
            
            album = this.state.albums[album_index];
        
            this.setState({
                appState : this.constants.appStates.photos,
                currentAlbum : album
            });
        }
        
        console.log(album);
        
        evt.preventDefault();
    },
    
    onPhotoClick : function (evt) {
        
        console.log('onPhotoClick');
        
        var photo_index = evt.currentTarget.getAttribute('data-index'),
            photo;
        
        if (photo_index !== undefined) {
            
            photo = this.state.currentAlbum.photos[photo_index];
        
            this.setState({
                appState : this.constants.appStates.photo,
                currentPhoto : photo
            });
        }
        
        console.log(photo);
        
        evt.preventDefault();
    },
    
    onPhotosBackClick : function () {
        
        this.setState({
            appState : this.constants.appStates.albums,
            currentAlbum : undefined
        });
    },
    
    onPhotoBackClick : function () {
        
        this.setState({
            appState : this.constants.appStates.photos,
            currentPhoto : undefined
        });
    },
    
    createImages : function (data, callback) {
        
        var i = 0,
            num_images,
            items = [],
            image,
            key,
            image_url;
        
        num_images = data.length;

        for (i; i < num_images; i++) {

            item = data[i];
            
            if (item.photos !== undefined && item.photos.length > 0) {
                
                image_url = item.photos[0].url;
                
            } else if (item.url !== undefined) {
                
                image_url = item.url;
            }

            key = 'image' + i;

            items.push(<Image title={item.title} imageUrl={image_url} callback={callback} index={i} key={key} />);
        }
                       
        return items;
    },
    
    render: function() {
        
        console.log('RERENDER');
                
        var albums,
            photos,
            markup;
                
        console.log(this.state.appState);
                
        if (this.state.appState === this.constants.appStates.albums) {
            
            if (this.state.albums !== undefined) {
            
                albums = this.createImages(this.state.albums, this.onAlbumClick);

                markup = <section>
                            <Grid items={albums} />
                        </section>;
            }
            
        } else if (this.state.appState === this.constants.appStates.photos) {
            
            if (this.state.currentAlbum !== undefined && this.state.currentAlbum.photos !== undefined) {
                
                photos = this.createImages(this.state.currentAlbum.photos, this.onPhotoClick);

                markup = <section>
                            <TitleBar title={this.state.currentAlbum.title} callback={this.onPhotosBackClick} />
                            <Grid items={photos} />
                        </section>;
            }
            
        } else if (this.state.appState === this.constants.appStates.photo) {
            
            if (this.state.currentAlbum.photos !== undefined && this.state.currentPhoto !== undefined) {
                
                photo = this.state.currentPhoto;
                
                console.log(photo);

                markup = <section>
                            <TitleBar title={photo.title} callback={this.onPhotoBackClick} />
                            <Slide imageUrl={photo.url} />
                        </section>;
            }
        }

        return <div className="content">
                {markup}
            </div>;
    }
});

ReactDOM.render(
    <ReactPhotos source="sample_data.json" />, 
    document.getElementById('container')
);