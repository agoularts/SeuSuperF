import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';

import api from '../../services/api';

export default function LikeButton() {
    const [product, setProduct] = useState([]);
    const [fav, setFav] = useState(false);
    const userID = localStorage.getItem('userID');

    async function handleNewFavorite(user, product) {
        setFav(!fav)
        if (fav) {
            const data = {
                user_id: user,
                product_id: product
            };

            if (fav) {
                return <Favorite />
            } else {
                <FavoriteBorder />
            }

            try {
                const response = await api.post('favorite', data);
                console.log(response.data)
            } catch (err) {
                alert('Erro ao adicionar favorito, tente novamente.');
            }
        }
    }
    
    return (
        <div>
            {product.map(prod => (
                <div key={ prod.id }>
                    <Button 
                        onClick={() => handleNewFavorite(userID, prod.id)} />
                </div>
            ))}
        </div>
    ); 
}
