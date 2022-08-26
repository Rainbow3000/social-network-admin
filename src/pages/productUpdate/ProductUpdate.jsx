import React from 'react'
import './productUpdate.scss'
import { Box, Input, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct} from '../../redux/slices/productSlice'
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ariaLabel = { 'aria-label': 'description' };
const sizes = [
    'S',
    'M',
    'L'
];

const colors = [
    'Red',
    'Green',
    'Blue',
    'Gray',
    'White',
    'Orange',
    'Pink',
    'Black',
    'Yellow',
    'Violet'
]

const categorys = [
    'Hat',
    'TShirt',
    'Shoes'
]

const ProductUpdate = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    const productId =location.pathname.split('/')[3];
    const { products } = useSelector(state => state.product);
    const singleProduct = products.find(item=>{
        return item._id === productId; 
    })
    const theme = useTheme();  
    const [color, setColor] = useState(singleProduct.color && [...singleProduct.color]);
    const [size, setSize] = useState(singleProduct.size && [...singleProduct.size]);
    const [category, setCategory] = useState( singleProduct.category && [...singleProduct.category]);
    const [price, setPrice] = useState(singleProduct.price);
    const [productName, setProductName] = useState(singleProduct.name);;
    const [productDes, setProductDes] = useState(singleProduct.desc);
    const [stock, setStock] = useState(singleProduct.inStock);
    const [previewSource, setPreviewSource] = useState(singleProduct.image);
    const [dataUrlImage, setDataUrlImage] = useState("");
    //const [categorys,setCategorys] = useState([]); 
    const handleChangeColor = (event) => {
        const {
            target: { value },
        } = event;
        setColor(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeSize = (event) => {
        const {
            target: { value },
        } = event;
        setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            );
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        readPreviewFile(file);
    }
    const readPreviewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setDataUrlImage(reader.result);
        }
    }
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const data = {
            name: productName,
            desc: productDes,
            size,
            color,
            inStock: stock,
            price,
            category,
            image: dataUrlImage
        }
        dispatch(updateProduct({productId,data}));
        navigate('/product');
    }
    return (
        <Box sx={{ width: "100%", marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className='create-product-title'>UPDATE PRODUCT</h2>
            <div className='create-product-delimiter'></div>
            <Box
                component="form"
                onSubmit={handleSubmitForm}
                sx={{
                    '& > :not(style)': { m: 1 },
                    width: 1000, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10
                }}
                noValidate
                autoComplete="off"
                >
                <Input value={productName} onChange={(e) => setProductName(e.target.value)} style={{ width: 400 }} placeholder='Name' inputProps={ariaLabel} />
                <Input value={productDes} onChange={(e) => setProductDes(e.target.value)} style={{ width: 400 }} placeholder='Description' inputProps={ariaLabel} />
                <Input value={price} type='number' onChange={(e) => setPrice(e.target.value)} style={{ width: 400 }} placeholder='Price' inputProps={ariaLabel} />
                <Input value={stock} type='number' onChange={(e) => setStock(e.target.value)} style={{ width: 400 }} placeholder='Stock' inputProps={ariaLabel} />
                {/*color*/}
                <Box>
                    <FormControl sx={{ width: 400, mt: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Color</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={color}
                            onChange={handleChangeColor}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {colors.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, color, theme)}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/*size*/}
                <Box>
                    <FormControl sx={{ width: 400, mt: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Size</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={size}
                            onChange={handleChangeSize}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {sizes.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, size, theme)}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {/*Category*/}
                <Box>
                    <FormControl sx={{ width: 400, mt: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={category}
                            onChange={handleChangeCategory}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {categorys.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, category, theme)}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'normal' }}>Image</Typography>
                    <Input className='inputFile' type='file' onChange={handleFileInputChange} style={{ width: 600 }} inputProps={ariaLabel} required/>
                </Box>
                <Box sx={{ width: 300 }}>
                    {previewSource ? <img width={300} height={200} style={{ borderRadius: 5, objectFit: 'cover' }} src={previewSource} /> : null}
                </Box>
                <button style={{ width: 250, height: 45, fontSize: 25, marginTop: 100, border: 'none', color: 'white', backgroundColor: 'gray', borderRadius: 5, cursor: 'pointer' }} >Update</button>
            </Box>
        </Box>
    )
}

export default ProductUpdate