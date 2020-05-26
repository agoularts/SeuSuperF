import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import { validaToken } from '../../services/auth';

import logoImg from '../../assets/logo.svg';

export default function NewProduct() {
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
            async function fetchData() {
                const token = await validaToken();
                if(!token){
                    return history.push('/');
                }
            }
            fetchData()
        },
        []
    )

    async function handleNewProduct(e) {
        e.preventDefault();

        const data = {
            name,
            img,
            description,
            category,
            brand,
            curiosities,
            specifications,
            howToBuy,
            howToPrepare,
            howToStore,
            howToDiscard,
        };
        
        try {
            const response = await api.post('product', data);
            history.push('/produto/novo');

            alert(`${ response.data.name } cadastrado com sucesso! ID ${ response.data.id }`);
            
        } catch (err) {
            alert('Erro no cadastro do produto, tente novamente.');
        }
    }

    async function handleNewNutrition(e) {
        e.preventDefault();
        
        const data = {
            product_id,
            portion,
            calories,
            carbohidrate,
            protein,
            totalFat,
            saturatedFat,
            transFat,
            cholesterol,
            dietaryFiber,
            sodium,
            vitamins,
            calcium,
            vitB1,
            vitB2,
            vitB6, 
            iron,
            niacin, 
            panthotenicAcid,
            folicAcid,
            sugar,
            monounsaturatedFat
        };
        
        console.log(data);
        
        try {
            const response = await api.post('nutrition', data);
            history.push('/produto');
            alert(`Informações nutricionais do produto ${ response.data.product_id } cadastradas com sucesso!`);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

        console.log(data);
    }

    return (
        <div className="newProduct-container">
                {/* Logo e texto */}
                <section className="logo">
                    <img src={ logoImg } alt="Seu Super"/>
                    <h1>Cadastrar novo produto</h1>

                {/* Voltar */} 
                    <Link className="back-link" to="/menu">
                        <FiArrowLeft size={ 16 } color="#E02041" />
                            Voltar
                    </Link>
                </section>

                {/* inputs */}
                    <form onSubmit={ handleNewProduct }>
                        
                        <input 
                            placeholder="Nome do produto"
                            value={ name }
                            onChange={ e=> setName(e.target.value) }
                        />
                       
                        <input 
                            placeholder="Imagem"
                            value={ img }
                            onChange={ e=> setImg(e.target.value) }
                        /> 
                        
                        <input className="text"
                            placeholder="Categoria"
                            value={ category }
                            onChange={ e=> setCategory(e.target.value) }
                        />   

                        <input 
                            placeholder="Marca/Produtor"
                            value={ brand }
                            onChange={ e=> setBrand(e.target.value) }
                        /> 

                        <textarea className="text"
                            placeholder="Descrição"
                            value={ description }
                            onChange={e => setDescription(e.target.value)}
                        />

                        <textarea className="text"
                            placeholder="Especificações"
                            value={ specifications }
                            onChange={ e=> setSpecifications(e.target.value) }
                        /> 

                        <textarea className="text"
                            placeholder="Como comprar"
                            value={ howToBuy }
                            onChange={ e=> setHowToBuy(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Como preparar"
                            value={ howToPrepare }
                            onChange={ e=> setHowToPrepare(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Como armazenar"
                            value={ howToStore }
                            onChange={ e=> setHowToStore(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Como descartar"
                            value={ howToDiscard }
                            onChange={ e=> setHowToDiscard(e.target.value) }
                        />

                        <textarea className="text"
                            placeholder="Curiosidades"
                            value={ curiosities }
                            onChange={ e=> setCuriosities(e.target.value) }
                        /> 

                        <button className="button" type="submit">Informações Nutricionais</button>

                    <br />
                    </form>
                    
                {/* inputs */}
                    <form onSubmit={ handleNewNutrition }>

                        <input 
                            placeholder="ID"
                            value={ product_id }
                            onChange={ e=> setProduct_id(e.target.value) }
                        />

                        <input 
                            placeholder="Porção (com unidade de medida)"
                            value={ portion }
                            onChange={ e=> setPortion(e.target.value) }
                        />

                        <input 
                            placeholder="Valor Energético (com unidade de medida)"
                            value={ calories }
                            onChange={ e=> setCalories(e.target.value) }
                        />   

                        <input 
                            placeholder="Carboidratos (com unidade de medida)"
                            value={ carbohidrate }
                            onChange={ e=> setCarbohidrate(e.target.value) }
                        /> 

                        <input
                            placeholder="Proteínas (com unidade de medida)"
                            value={ protein }
                            onChange={e => setProtein(e.target.value)}
                        />

                        <input
                            placeholder="Gorduras Totais (com unidade de medida)"
                            value={ totalFat }
                            onChange={ e=> setTotalFat(e.target.value) }
                        /> 

                        <input
                            placeholder="Gorduras Saturadas (com unidade de medida)"
                            value={ saturatedFat }
                            onChange={ e=> setSaturatedFat(e.target.value) }
                        />

                        <input
                            placeholder="Gorduras Trans (com unidade de medida)"
                            value={ transFat }
                            onChange={ e=> setTransFat(e.target.value) }
                        />

                        <input
                            placeholder="Colesterol (com unidade de medida)"
                            value={ cholesterol }
                            onChange={ e=> setCholesterol(e.target.value) }
                        />

                        <input
                            placeholder="Fibra Alimentar (com unidade de medida)"
                            value={ dietaryFiber }
                            onChange={ e=> setDietaryFiber(e.target.value) }
                        />

                        <input
                            placeholder="Sódio (com unidade de medida)"
                            value={ sodium }
                            onChange={ e=> setSodium(e.target.value) }
                        /> 

                        <input
                            placeholder="Vitaminas (com unidade de medida)"
                            value={ vitamins }
                            onChange={ e=> setVitamins(e.target.value) }
                        /> 

                        <input
                            placeholder="Cálcio (com unidade de medida)"
                            value={ calcium }
                            onChange={ e=> setCalcium(e.target.value) }
                        /> 

                        <input
                            placeholder="Açúcares (com unidade de medida)"
                            value={ sugar }
                            onChange={ e=> setSugar(e.target.value) }
                        /> 

                        <input
                            placeholder="Ferro (com unidade de medida)"
                            value={ iron }
                            onChange={ e=> setIron(e.target.value) }
                        /> 
                        
                        <input
                            placeholder="Vitamina B1 (com unidade de medida)"
                            value={ vitB1 }
                            onChange={ e=> setVitB1(e.target.value) }
                        /> 
                        
                        <input
                            placeholder="Vitamina B2 (com unidade de medida)"
                            value={ vitB2 }
                            onChange={ e=> setVitB2(e.target.value) }
                        /> 
                        
                        <input
                            placeholder="Vitamina B6 (com unidade de medida)"
                            value={ vitB6 }
                            onChange={ e=> setVitB6(e.target.value) }
                        />
                        
                        <input
                            placeholder="Niacina (com unidade de medida)"
                            value={ niacin }
                            onChange={ e=> setNiacin(e.target.value) }
                        />
                        
                        <input
                            placeholder="Ácido Pantotênico (com unidade de medida)"
                            value={ panthotenicAcid }
                            onChange={ e=> setPanthotenicAcid(e.target.value) }
                        />
                        
                        <input
                            placeholder="Ácido Fólico (com unidade de medida)"
                            value={ folicAcid }
                            onChange={ e=> setFolicAcid(e.target.value) }
                        /> 

                        <input
                            placeholder="Gordura Monoinsaturada (com unidade de medida)"
                            value={ monounsaturatedFat }
                            onChange={ e=> setMonounsaturatedFat(e.target.value) }
                        /> 

                      <button className="button" type="submit">Confirmar</button>
                    </form>
                    
            </div>
        )
}

