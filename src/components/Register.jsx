import { useEffect, useState } from "react";
import { Button, Card, CardFooter, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";


import axios from "axios";


const initialForm = {
    ad: '',
    soyad: '',
    email: '',
    password: '',
  };

  const errorMessages = {
    ad: 'Lütfen adınızı giriniz..',
    soyad: 'Lütfen soyadınızı giriniz..',
    email: 'Geçerli email adresi giriniz..',
    password: 'Şifre en az 8 karakter uzunluğunda olmalı ve  büyük harf,küçük harf,sembol,sayı içermelidir..',
  };

 
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  
  const validatePassword = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
  


export default function Register() {

    const[formData, setFormData] = useState(initialForm);
    const[isValid, setIsValid] = useState(false);
    const[errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
    
    });

    const [id,setId]=useState("");
    const handleChange = (event) => {
        let { name, value, type } = event.target;
        setFormData({ ...formData, [name]: value });
        if (name == 'ad' || name == 'soyad') {
            if (value!='' &&  value.trim().length>=3) {
              setErrors({ ...errors, [name]: false });
            } else {
              setErrors({ ...errors, [name]: true });
            }
          }
        if (name == 'email') {
            if (validateEmail(value)) {
              setErrors({ ...errors, [name]: false });
            } else {
              setErrors({ ...errors, [name]: true });
            }
          }
          if (name == 'password') {
            if (validatePassword.test(value)) {
              //trim boşluk kabul etmez
              setErrors({ ...errors, [name]: false });
            } else {
              setErrors({ ...errors, [name]: true });
            }
          }
    };

    useEffect(() => {
        if (
            formData.ad.trim().length >= 3 && formData.soyad.trim().length >= 3 && validateEmail(formData.email) &&
          validatePassword.test(formData.password) ) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }, [formData]);

      const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return; //valid değilse return et sonraki kodu çalıştırma
        axios
          .post('https://reqres.in/api/users')
          .then((response) => {
            setId(response.data.id)
            setFormData(initialForm)
          })
          .catch((error)=> console.warn(error));
      };
    


    return (
    <>
    <Card
   color="secondary"
    outline
  style={{
    width: '18rem'
  }}
>

    <Form onSubmit={handleSubmit}>
    <FormGroup>
    <Label for="ad">
      Adınız
    </Label>
    <Input
      id="ad"
      name="ad"
      placeholder="Adınızı giriniz.."
      type="ad"
      onChange={handleChange}
      value={formData.ad}
    invalid={errors.ad}
    />
    {errors.ad && (
          <FormFeedback>{errorMessages.ad}</FormFeedback>
          )}
  </FormGroup>
  <FormGroup>
    <Label for="soyad">
      Soyadınız
    </Label>
    <Input
      id="soyad"
      name="soyad"
      placeholder="Soyadınızı giriniz.."
      type="soyad"
      onChange={handleChange}
      value={formData.soyad}
    invalid={errors.soyad}
    />
    {errors.soyad && (
          <FormFeedback>{errorMessages.soyad}</FormFeedback>
          )}
  </FormGroup>
  <FormGroup>
    <Label for="email">
      Email
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Email adresinizi giriniz.."
      type="email"
      onChange={handleChange}
      value={formData.email}
    invalid={errors.email}
    />
    {errors.email && (
          <FormFeedback>{errorMessages.email}</FormFeedback>
          )}
  </FormGroup>
  <FormGroup>
    <Label for="password">
      Password
    </Label>
    <Input
      id="password"
      name="password"
      placeholder="Şifrenizi giriniz.."
      type="password"
      onChange={handleChange}
      value={formData.password}
    invalid={errors.password}
    />
    {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
  </FormGroup>
  <Button disabled={!isValid}>
    Kaydol
  </Button>

</Form>
<CardFooter>
ID Numarası: {id}
  </CardFooter>
</Card>
    </>
    );
}