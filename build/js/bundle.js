var ReactPhotos = React.createClass({
    displayName: 'ReactPhotos',


    constants: {
        appStates: {
            albums: 'albums',
            photos: 'photos',
            photo: 'photo'
        }
    }, // constants for the states of the app

    getInitialState: function () {

        // return the initial data for app
        return {
            appState: this.constants.appStates.albums,
            albums: undefined
        };
    },

    componentDidMount: function () {

        // store update function to keep the context
        var update = this.update; // TODO find more eloquent way of keeping context

        // use the built in fetch api to retrieve JSON file
        fetch(this.props.source, {

            method: 'get'

        }).then(function (response) {

            // return the JSON data...
            return response.json();
        }).then(function (data) {

            // ... and update the state
            update(data.albums);
        }).catch(function (err) {
            // TODO handle error here
        });
    },

    update: function (data) {

        this.setState({
            albums: data
        });
    },

    onAlbumClick: function (evt) {

        var album_index = evt.currentTarget.getAttribute('data-index'),
            // get the album index into data array
        album;

        // check if index exists. TODO is number?
        if (album_index !== undefined) {

            // store the album
            album = this.state.albums[album_index];

            // update the app state and store album data
            this.setState({
                appState: this.constants.appStates.photos,
                currentAlbum: album
            });
        }

        // stop the default behaviour of link
        evt.preventDefault();
    },

    onPhotoClick: function (evt) {

        var photo_index = evt.currentTarget.getAttribute('data-index'),
            // get index of photo in array
        photo;

        // make sure index exists
        if (photo_index !== undefined) {

            // store the photo data
            photo = this.state.currentAlbum.photos[photo_index];

            // update the app state and store photo data
            this.setState({
                appState: this.constants.appStates.photo,
                currentPhoto: photo
            });
        }

        // stop the default behaviour of link
        evt.preventDefault();
    },

    onPhotosBackClick: function () {

        // update the app state and clear current album
        this.setState({
            appState: this.constants.appStates.albums,
            currentAlbum: undefined
        });
    },

    onPhotoBackClick: function () {

        // update the app state and clear the current photo
        this.setState({
            appState: this.constants.appStates.photos,
            currentPhoto: undefined
        });
    },

    // helper function to create image elements
    createImages: function (data, callback) {

        var i = 0,
            num_images,
            items = [],
            item,
            item,
            key,
            image_url;

        // store the number of images
        num_images = data.length;

        // loop through data and create an Image element for each one
        for (i; i < num_images; i++) {

            item = data[i]; // cache data

            // check if photos exist
            if (item.photos !== undefined && item.photos.length > 0) {

                // store image url of first photo if it's album (has a photos attribute)
                image_url = item.photos[0].url;
            } else if (item.url !== undefined) {

                // no photos attribute so it's a photo
                image_url = item.url;
            }

            // create key for item
            key = 'image' + i;

            // create Image element
            items.push(React.createElement(Image, { title: item.title, imageUrl: image_url, callback: callback, index: i, key: key }));
        }

        return items;
    },

    render: function () {

        var albums, photos, markup;

        // handle state change of app. TODO create "No Albums" and "No Photos" states
        if (this.state.appState === this.constants.appStates.albums) {

            // create elements for albums if they exist
            if (this.state.albums !== undefined) {

                albums = this.createImages(this.state.albums, this.onAlbumClick);

                markup = React.createElement(
                    'section',
                    null,
                    React.createElement(Grid, { items: albums })
                );
            }
        } else if (this.state.appState === this.constants.appStates.photos) {

            // create photo elements and markup if they exist
            if (this.state.currentAlbum !== undefined && this.state.currentAlbum.photos !== undefined) {

                photos = this.createImages(this.state.currentAlbum.photos, this.onPhotoClick);

                markup = React.createElement(
                    'section',
                    null,
                    React.createElement(TitleBar, { title: this.state.currentAlbum.title, callback: this.onPhotosBackClick }),
                    React.createElement(Grid, { items: photos })
                );
            }
        } else if (this.state.appState === this.constants.appStates.photo) {

            // create markup for photo if it exists
            if (this.state.currentAlbum.photos !== undefined && this.state.currentPhoto !== undefined) {

                photo = this.state.currentPhoto;

                markup = React.createElement(
                    'section',
                    null,
                    React.createElement(TitleBar, { title: photo.title, callback: this.onPhotoBackClick }),
                    React.createElement(Slide, { imageUrl: photo.url })
                );
            }
        }

        return React.createElement(
            'div',
            { className: 'content' },
            markup
        );
    }
});

ReactDOM.render(React.createElement(ReactPhotos, { source: 'sample_data.json' }), document.getElementById('container'));

var Grid = React.createClass({
    displayName: "Grid",


    render: function () {

        var items = this.props.items;

        return React.createElement(
            "div",
            { className: "grid" },
            items
        );
    }
});

var Image = React.createClass({
    displayName: 'Image',


    render: function () {

        var markup, style, title;

        // set title if it exists
        if (this.props.title) {

            title = React.createElement(
                'h3',
                { className: 'image__title' },
                this.props.title
            );
        }

        // use image as a background image style
        style = {
            backgroundImage: 'url(' + this.props.imageUrl + ')'
        };

        // make element a link if it has a callback or a div if not
        if (this.props.callback) {

            markup = React.createElement(
                'a',
                { className: 'image', onClick: this.props.callback, 'data-index': this.props.index, href: '#', style: style },
                title
            );
        } else {

            markup = React.createElement(
                'div',
                { className: 'image', style: style },
                title
            );
        }

        return markup;
    }
});

var Slide = React.createClass({
    displayName: 'Slide',


    render: function () {

        var style = {
            backgroundImage: 'url(' + this.props.imageUrl + ')'
        };

        return React.createElement('div', { className: 'slide', style: style });
    }
});

var TitleBar = React.createClass({
    displayName: "TitleBar",


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
