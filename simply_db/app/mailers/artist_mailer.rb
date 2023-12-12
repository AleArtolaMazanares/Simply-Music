class ArtistMailer < ApplicationMailer
  def confirmation_email(artist)
    @artist = artist
    mail(to: @artist.email, subject: 'Confirmación de registro como artista')
  end
end