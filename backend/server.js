// CORS para produção
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// Middleware para produção
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}
