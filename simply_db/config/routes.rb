# config/routes.rb

Rails.application.routes.draw do
  devise_for :users

  namespace :users do
    resources :feeds do
      get 'feeds_for_user/:user_id', action: :feeds_for_user, on: :collection
    end
    resources :albums do
      collection do
        get 'get_album_by_content_artist/:content_artist_id', to: 'albums#get_album_by_content_artist'
      end
    end

    resources :messages do
      collection do
        get 'get_messages_by_artist/:content_artist_id', to: 'messages#get_messages_by_artist'
      end
      member do
        post 'like', to: 'messages#like'
      end
    end

    resources :users do
      collection do
        get 'search', to: 'users#search'
      end
    end

    resources :login
    resources :songs do
      collection do
        get 'get_songs_by_content_artist/:content_artist_id', to: 'songs#get_songs_by_content_artist'
        get 'search', to: 'songs#search'
        get 'get_songs_by_id/:id', to: 'songs#get_songs_by_id'
      end
    end

    resources :artists
    resources :content_artists do
      collection do
        get :get_ids_by_user
      end
    end
  end
end
