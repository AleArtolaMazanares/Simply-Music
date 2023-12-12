Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000'  # El origen de tu aplicación React
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :update]
    end
  end