const login = async (req, res) => {
    try {
      const { phoneNumber, password, deviceInfo } = req.body;
  
      // Verificar si el usuario existe con el número de teléfono
      const user = await User.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
  
      // Generar el token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      // Guardar la sesión en la base de datos
      const newSession = new Session({
        userId: user._id,
        token,
        deviceInfo,
      });
  
      await newSession.save();
  
      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  };
  