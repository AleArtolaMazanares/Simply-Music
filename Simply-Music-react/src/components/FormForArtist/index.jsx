import React from "react";

function HandleFormForArtist({formData, handleSubmit, handleChange}) {
  return (
    <form className="formSubmitInfo form-content" onSubmit={handleSubmit}>
      <div className="form-submit">
        <label>
          Artistic name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginLeft: "10px" }}
            />
          )}
        </label>
        <br />
        <label>
          Description of the artist:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Genre of your music:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}

export default HandleFormForArtist;
