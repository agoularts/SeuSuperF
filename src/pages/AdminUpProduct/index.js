import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';
import logoImg from '../../assets/logo.svg';

export default function UpdateProduct(props) {
    const [product, setProduct] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [curiosities, setCuriosities] = useState('');
    const [specifications, setSpecifications] = useState('');
    const [howToBuy, setHowToBuy] = useState('');
    const [howToPrepare, setHowToPrepare] = useState('');
    const [howToStore, setHowToStore] = useState('');
    const [howToDiscard, setHowToDiscard] = useState('');
    const [product_id, setProduct_id] = useState('');
    const [portion, setPortion] = useState('');
    const [calories, setCalories] = useState('');
    const [carbohidrate, setCarbohidrate] = useState('');
    const [protein, setProtein] = useState('');
    const [totalFat, setTotalFat] = useState('');
    const [saturatedFat, setSaturatedFat] = useState('');
    const [transFat, setTransFat] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [dietaryFiber, setDietaryFiber] = useState('');
    const [sodium, setSodium] = useState('');
    const [vitamins, setVitamins] = useState('');
    const [calcium, setCalcium] = useState('');
    const [vitB1, setVitB1] = useState('');
    const [vitB2, setVitB2] = useState('');
    const [vitB6, setVitB6] = useState('');
    const [iron, setIron] = useState('');
    const [niacin, setNiacin] = useState('');
    const [panthotenicAcid, setPanthotenicAcid] = useState('');
    const [folicAcid, setFolicAcid] = useState('');
    const [sugar, setSugar] = useState('');
    const [monounsaturatedFat, setMonounsaturatedFat] = useState('');
    const history = useHistory();

    useEffect(
        () => {
            window.scrollTo(0, 0)
            async function fetchData() {
                const token = await validaToken();
                if (!token) {
                    return history.push('/');
                }

                try {
                    const { id } = props.match.params
                    const retornoApi = await api.get(`/productList/${id}`,
                        {
                            headers: {
                                auth: localStorage.userToken
                            }
                        })
                    setId(retornoApi.data[0].id)
                    setName(retornoApi.data[0].name)
                    setImg(retornoApi.data[0].img)
                    setDescription(retornoApi.data[0].description)
                    setCategory(retornoApi.data[0].category)
                    setBrand(retornoApi.data[0].brand)
                    setCuriosities(retornoApi.data[0].curiosities)
                    setSpecifications(retornoApi.data[0].specifications)
                    setHowToBuy(retornoApi.data[0].howToBuy)
                    setHowToPrepare(retornoApi.data[0].howToPrepare)
                    setHowToStore(retornoApi.data[0].howToStore)
                    setHowToDiscard(retornoApi.data[0].howToDiscard)
                    setProduct_id(retornoApi.data[0].product_id)
                    setPortion(retornoApi.data[0].portion)
                    setCalories(retornoApi.data[0].calories)
                    setCarbohidrate(retornoApi.data[0].carbohidrate)
                    setProtein(retornoApi.data[0].proteinsetProtein)
                    setTotalFat(retornoApi.data[0].totalFat)
                    setSaturatedFat(retornoApi.data[0].saturatedFat)
                    setTransFat(retornoApi.data[0].transFat)
                    setCholesterol(retornoApi.data[0].cholesterol)
                    setDietaryFiber(retornoApi.data[0].dietaryFiber)
                    setSodium(retornoApi.data[0].sodium)
                    setVitamins(retornoApi.data[0].vitamins)
                    setCalcium(retornoApi.data[0].calcium)
                    setVitB1(retornoApi.data[0].vitB1)
                    setVitB2(retornoApi.data[0].vitB2)
                    setVitB6(retornoApi.data[0].vitB6)
                    setIron(retornoApi.data[0].iron)
                    setNiacin(retornoApi.data[0].niacin)
                    setPanthotenicAcid(retornoApi.data[0].panthotenicAcid)
                    setFolicAcid(retornoApi.data[0].folicAcid)
                    setSugar(retornoApi.data[0].sugar)
                    setMonounsaturatedFat(retornoApi.data[0].monounsaturatedFat)
                        console.log(retornoApi.data)
                } catch (err) {
                    console.log(err)
                    alert('Erro no useEffect searchMarket')
                }
            }
            fetchData()
        },
        [props.match.params]
    )

    async function handleUpdateProduct(id) {
        const data = {
            id, name, img, description, category, brand, curiosities, specifications,
            howToBuy, howToPrepare, howToStore, howToDiscard
        };

        try {
            id = data.id
            const response = await api.put(`/updateProduct/${id}`, data);

            setId(response.data[0].id)
            setName(response.data[0].name)
            setImg(response.data[0].img)
            setDescription(response.data[0].description)
            setCategory(response.data[0].category)
            setBrand(response.data[0].brand)
            setCuriosities(response.data[0].curiosities)
            setSpecifications(response.data[0].specifications)
            setHowToBuy(response.data[0].howToBuy)
            setHowToPrepare(response.data[0].howToPrepare)
            setHowToStore(response.data[0].howToStore)
            setHowToDiscard(response.data[0].howToDiscard)

            alert(`${response.data.name} alterado com sucesso!`);
        } catch (err) {
            console.log(product)
            alert('Erro na alteração do cadastro, tente novamente.');
        }
    }

    async function handleUpdateNutrition(id) {
        const data = {
            product_id, portion, calories, carbohidrate, protein, totalFat,
            saturatedFat, transFat, cholesterol, dietaryFiber, sodium, vitamins,
            calcium, vitB1, vitB2, vitB6, iron, niacin, panthotenicAcid, folicAcid,
            sugar, monounsaturatedFat
        };

        try {
            id = data.product_id
            const response = await api.put(`/updateNutrition/${id}`, data);

            setPortion(response.data[0].portion)
            setCalories(response.data[0].calories)
            setCarbohidrate(response.data[0].carbohidrate)
            setProtein(response.data[0].proteinsetProtein)
            setTotalFat(response.data[0].totalFat)
            setSaturatedFat(response.data[0].saturatedFat)
            setTransFat(response.data[0].transFat)
            setCholesterol(response.data[0].cholesterol)
            setDietaryFiber(response.data[0].dietaryFiber)
            setSodium(response.data[0].sodium)
            setVitamins(response.data[0].vitamins)
            setCalcium(response.data[0].calcium)
            setVitB1(response.data[0].vitB1)
            setVitB2(response.data[0].vitB2)
            setVitB6(response.data[0].vitB6)
            setIron(response.data[0].iron)
            setNiacin(response.data[0].niacin)
            setPanthotenicAcid(response.data[0].panthotenicAcid)
            setFolicAcid(response.data[0].folicAcid)
            setSugar(response.data[0].sugar)
            setMonounsaturatedFat(response.data[0].monounsaturatedFat)

            alert('Informações atualizadas com sucesso!');
        } catch (err) {
            console.log(product)
            alert('Erro na alteração do cadastro, tente novamente.');
        }
    }
    async function gotoAdmin() {
        history.push("/admin");
    }

    return (
        <div className="update-product-container">
            <div className="content">
                <header className="logo">
                    <img src={logoImg} alt="Seu Super" onClick={() => gotoAdmin()} />
                    <h1>Alterar cadastro de produto</h1>
                                    
                    <Link className="back-link" to="/admin">
                    {<FiArrowLeft size={25} color="#E02041" />}
                    Voltar
                </Link>
                </header>

                <div>
                    <form onSubmit={ () => handleUpdateProduct(id), () => handleUpdateNutrition(product_id)}>
                        <input
                            placeholder={name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            placeholder={img}
                            value={img}
                            onChange={e => setImg(e.target.value)}
                        />

                        <input className="text"
                            placeholder={category}
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />

                        <input
                            placeholder={brand}
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={description}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={specifications}
                            value={specifications}
                            onChange={e => setSpecifications(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={howToBuy}
                            value={howToBuy}
                            onChange={e => setHowToBuy(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={howToPrepare}
                            value={howToPrepare}
                            onChange={e => setHowToPrepare(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={howToStore}
                            value={howToStore}
                            onChange={e => setHowToStore(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={howToDiscard}
                            value={howToDiscard}
                            onChange={e => setHowToDiscard(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder={curiosities}
                            value={curiosities}
                            onChange={e => setCuriosities(e.target.value)}
                        />

                        <input type="number"
                            placeholder={portion}
                            value={portion}
                            onChange={e => setPortion(e.target.value)}
                        />

                        <input type="number"
                            placeholder={calories}
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                        />

                        <input type="number"
                            placeholder={carbohidrate}
                            value={carbohidrate}
                            onChange={e => setCarbohidrate(e.target.value)}
                        />

                        <input type="number"
                            placeholder={protein}
                            value={protein}
                            onChange={e => setProtein(e.target.value)}
                        />

                        <input type="number"
                            placeholder={totalFat}
                            value={totalFat}
                            onChange={e => setTotalFat(e.target.value)}
                        />

                        <input type="number"
                            placeholder={saturatedFat}
                            value={saturatedFat}
                            onChange={e => setSaturatedFat(e.target.value)}
                        />

                        <input type="number"
                            placeholder={transFat}
                            value={transFat}
                            onChange={e => setTransFat(e.target.value)}
                        />

                        <input type="number"
                            placeholder={cholesterol}
                            value={cholesterol}
                            onChange={e => setCholesterol(e.target.value)}
                        />

                        <input type="number"
                            placeholder={dietaryFiber}
                            value={dietaryFiber}
                            onChange={e => setDietaryFiber(e.target.value)}
                        />

                        <input type="number"
                            placeholder={sodium}
                            value={sodium}
                            onChange={e => setSodium(e.target.value)}
                        />

                        <input type="number"
                            placeholder={vitamins}
                            value={vitamins}
                            onChange={e => setVitamins(e.target.value)}
                        />

                        <input type="number"
                            placeholder={calcium}
                            value={calcium}
                            onChange={e => setCalcium(e.target.value)}
                        />

                        <input type="number"
                            placeholder={sugar}
                            value={sugar}
                            onChange={e => setSugar(e.target.value)}
                        />

                        <input type="number"
                            placeholder={iron}
                            value={iron}
                            onChange={e => setIron(e.target.value)}
                        />

                        <input type="number"
                            placeholder={vitB1}
                            value={vitB1}
                            onChange={e => setVitB1(e.target.value)}
                        />

                        <input type="number"
                            placeholder={vitB2}
                            value={vitB2}
                            onChange={e => setVitB2(e.target.value)}
                        />

                        <input type="number"
                            placeholder={vitB6}
                            value={vitB6}
                            onChange={e => setVitB6(e.target.value)}
                        />

                        <input type="number"
                            placeholder={niacin}
                            value={niacin}
                            onChange={e => setNiacin(e.target.value)}
                        />

                        <input type="number"
                            placeholder={panthotenicAcid}
                            value={panthotenicAcid}
                            onChange={e => setPanthotenicAcid(e.target.value)}
                        />

                        <input type="number"
                            placeholder={folicAcid}
                            value={folicAcid}
                            onChange={e => setFolicAcid(e.target.value)}
                        />

                        <input type="number"
                            placeholder={monounsaturatedFat}
                            value={monounsaturatedFat}
                            onChange={e => setMonounsaturatedFat(e.target.value)}
                        />
                        <button className="button" type="submit">Confirmar</button>
                    </form>
                </div>
            </div>
        </div>
    )

}