   //=======================
   //========PUERTO=========
   //=======================
   //configuramos el puerto
   process.env.PORT = process.env.PORT || 3000

   //=======================
   //========ENTORNO========
   //=======================

   process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


   //=======================
   //=====BASE DE DATOS=====
   //=======================
   //60 seg
   //60 min
   //24 h
   //30 dias
   process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30


   //=============================
   //=====SEED DE AUTENTICACIÓN=====
   //===============================

   process.env.SEED = process.env.SEED || 'seed-desarrollo'


   //=======================
   //=====BASE DE DATOS=====
   //=======================

   let urlBD

   if (process.env.NODE_ENV === 'dev') {
       urlBD = 'mongodb://localhost:27017/cafe'

   } else {
       urlBD = process.env.urlBD_Mongo
   }
   process.env.urlBD = urlBD