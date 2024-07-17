import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postSpot } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';

const CreateSpot = () => {
    const currUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('Cool Place')
    const [country, setCountry] = useState("USA");
    const [address, setAddress] = useState("123 1st Ave");
    const [city, setCity] = useState("Oakland");
    const [state, setState] = useState("CA");
    const [latitude, setLatitude] = useState("50.1234");
    const [longitude, setLongitude] = useState("100.1234");
    const [description, setDescription] = useState("Very nice place, in the hood, you can hear gunshots and it will sound like fireworks. Great for family and fun!");
    const [price, setPrice] = useState(199.99);
    const [mainImageUrl, setMainImageUrl] = useState("https://picsum.photos/300/300?random=1");
    const [imageUrl1, setImageUrl1] = useState("https://picsum.photos/300/300?random=2");
    const [imageUrl2, setImageUrl2] = useState("https://picsum.photos/300/300?random=3");
    const [imageUrl3, setImageUrl3] = useState("https://picsum.photos/300/300?random=4");
    const [imageUrl4, setImageUrl4] = useState("https://picsum.photos/300/300?random=5");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let formErrors = {};

        // error if field is empty
        if (!name) formErrors.name = 'Name is required'
        if (!country) formErrors.country = "Country is required";
        if (!address) formErrors.address = "Address is required";
        if (!city) formErrors.city = "City is required";
        if (!state) formErrors.state = "State is required";
        if (!latitude) formErrors.latitude = "Latitude is required";
        if (!longitude) formErrors.longitude = "Longitude is required";
        if (!description) formErrors.description = "Description is required";
        if (!price) formErrors.price = "Price is required";
        if (!mainImageUrl)
            formErrors.mainImageUrl = "Main Image URL is required";
        if (!imageUrl1) formErrors.imageUrl1 = "Image URL 1 is required";
        if (!imageUrl2) formErrors.imageUrl2 = "Image URL 2 is required";
        if (!imageUrl3) formErrors.imageUrl3 = "Image URL 3 is required";
        if (!imageUrl4) formErrors.imageUrl4 = "Image URL 4 is required";

        // technical errors
        if (description.length <= 30)
            formErrors.description = "Description is too short";

        setErrors(formErrors);
    }, [
        name,
        country,
        address,
        city,
        state,
        latitude,
        longitude,
        description,
        price,
        mainImageUrl,
        imageUrl1,
        imageUrl2,
        imageUrl3,
        imageUrl4
    ]);

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true);

        const spotBody = {
            ownerId: currUser.id,
            name: name,
            country: country,
            address: address,
            city: city,
            state: state,
            lat: latitude,
            lng: longitude,
            description: description,
            price: price
        }

        const createdSpot = await dispatch(postSpot(spotBody));

        console.log('createSpot', createdSpot)

        // const imagePayloads = [
        //     1,2,3
        // ];

        // await Promise.all(imagePayloads.map)

        navigate(`/spots/${createdSpot.id}`, {replace: true})
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1> Create a new Spot</h1>
            <div className="location-info">
                <div className="location-guide">
                    <h2> Where&apos;s your place located?</h2>
                    <h3>
                        Guests will only get your exact address once they booked
                        a reservation
                    </h3>
                </div>
                <div className="location-info-container">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        value={country}
                        id="country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {hasSubmitted && errors.country && (
                        <span>{errors.country}</span>
                    )}
                    <label htmlFor="address">Street Address</label>
                    <input
                        type="text"
                        value={address}
                        id="address"
                        name="address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {hasSubmitted && errors.address && (
                        <span>{errors.address}</span>
                    )}
                    <div className="city-state">
                        <label htmlFor="city">City</label>,
                        <input
                            type="text"
                            value={city}
                            id="city"
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {hasSubmitted && errors.city && (
                            <span>{errors.city}</span>
                        )}
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            value={state}
                            id="state"
                            name="state"
                            onChange={(e) => setState(e.target.value)}
                        />
                        {hasSubmitted && errors.state && (
                            <span>{errors.state}</span>
                        )}
                    </div>
                    <div className="lat-lng">
                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="text"
                            value={latitude}
                            id="latitude"
                            name="lat"
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        {hasSubmitted && errors.latitude && (
                            <span>{errors.latitude}</span>
                        )}
                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="text"
                            value={longitude}
                            id="longitude"
                            name="lng"
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                        {hasSubmitted && errors.longitude && (
                            <span>{errors.longitude}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="description-info">
                <div className="description-guide">
                    <h2>Describe your place to guests</h2>
                    <h3>
                        Mention the best features of your space, any special
                        amentities like fast wifi or parking, and what you love
                        about the neighborhood.
                    </h3>
                </div>
                <textarea
                    className="description-box"
                    placeholder="Please type at least 30 words."
                    value={description}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {hasSubmitted && errors.description && (
                    <span>{errors.description}</span>
                )}
            </div>
            <div className='title-info'>
                <div className='title-guide'>
                    <h2>Create a title for your spot</h2>
                    <h3>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h3>
                </div>
                <input
                    placeholder='Name of your spot'
                    value={name}
                    id='name'
                    name='name'
                    onChange={e => setName(e.target.value)}
                />
                {hasSubmitted && errors.name && (
                    <span>{errors.name}</span>
                )}
            </div>
            <div className="price-info">
                <div className="price-guide">
                    <h2>Set a base price for your spot</h2>
                    <h3>
                        Competitive pricing can help your listing stand out and
                        rank higher in search results
                    </h3>
                </div>
                <label htmlFor="price">$</label>
                <input
                    type="number"
                    value={price}
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                {hasSubmitted && errors.price && <span>{errors.price}</span>}
            </div>
            <div className="photo-info">
                <div className="photo-guide">
                    <h2>Liven up your spot with photos</h2>
                    <h3>
                        Submit a link to at least one photo to publish your
                        spot.
                    </h3>
                </div>
                <div className="photo-urls">
                    <input
                        type="url"
                        placeholder="preview Image URL"
                        value={mainImageUrl}
                        name="url"
                        onChange={(e) => setMainImageUrl(e.target.value)}
                    />
                    {hasSubmitted && errors.mainImageUrl && (
                        <span>{errors.mainImageUrl}</span>
                    )}
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={imageUrl1}
                        name="url"
                        onChange={(e) => setImageUrl1(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={imageUrl2}
                        name="url"
                        onChange={(e) => setImageUrl2(e.target.value)}
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={imageUrl3}
                        name="url"
                        onChange={(e) => setImageUrl3(e.target.value)}
                    />{" "}
                    <input
                        type="url"
                        placeholder="Image URL"
                        value={imageUrl4}
                        name="url"
                        onChange={(e) => setImageUrl4(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">
                Create Spot
            </button>
        </form>
    );
};

export default CreateSpot;
