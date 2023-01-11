import { useState } from "react";

import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";

import MDButton from "components/MDButton";
import ReactImageUploading from "react-images-uploading";
import Loading from "../../../components/Loading";

import api from "api";
import MDBox from "components/MDBox";
import imageIcon from "assets/images/base64";

export default ({ idTratamento, idCombinacao, image, tipo, lado, success, error }) => {
  const resizebase64 = require('resize-base64');
  
  const [isLoading, setIsLoading] = useState(false);
  const [imagem, setImagem] = useState({
      content: `data:${tipo};base64,${image}`,
      name: '',
      new: false
  });
  const esquerdoOuDireito = lado === 'esquerdo' ? 'idImagem1' : 'idImagem2';

  function salvarImagem() {
    setIsLoading(true);

    imagem.content = resizebase64(imagem.content);

    const imagemParaSalvar = { 
      nome: imagem.name, 
      tipo: imagem.content.split(";")[0].replace("data:", ""), 
      stringBase64: imagem.content.split(";")[1].replace("base64,", "") 
    };

    api.post((`/api/imagem/base64/${idTratamento}`), imagemParaSalvar)
      .then((res) => {
        if (res.status === 200) {
          api.put((`/api/combinacaoImagens/${idCombinacao}`), {
            [esquerdoOuDireito]: `${res.data.id}`
          })
          .then((res) => {
            if (res.status === 200) {
              setIsLoading(false);
              setImagem({ ...imagem, new: false })
              success();
            }
          }).catch((error) => {
            error();
            console.error(error)
          });
        }
      }).catch((error) => {
        error();
        console.error(error)
      });
  }

  function excluirImagem() {
    setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);

    api.put(`/api/combinacaoImagens/${idCombinacao}`, {
      [esquerdoOuDireito]: 0
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setImagem({ 
            content: imageIcon.content,
            name: '',
            new: false
          })
          success();
        }
      }).catch((error) => {
        error();
        console.error(error);
      });
  }

  return (
      <Grid item={true} xs={6} md={6}>
      {
          isLoading ?
          <Grid display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="70vh">
              <Loading type="spin" />
          </Grid> :
          <>
          <img
              style={{borderRadius:"1rem", width: '98%', height: '450px', objectFit: 'cover'}}
              src={imagem.content}
          />
          <Grid item container justifyContent='center'>
              <ReactImageUploading onChange={(values) => {
                  setImagem({
                      content: values[0].dataURL,
                      name: values[0].file.name,
                      new: true
                  })
              }}>
                  {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps,}) => (
                      <>
                      <MDBox p={0.5}>
                      <MDButton
                          style={isDragging ? { color: 'red' } : { color: 'grey', borderColor: 'grey'}}
                          size="small"
                          variant="outlined"
                          onClick={onImageUpload}
                          {...dragProps}
                      >
                          <Icon>edit</Icon>
                      </MDButton>
                      { imagem.new &&
                          <>
                            &nbsp;
                            <MDButton
                                style={{color: 'grey', borderColor: 'grey' }}
                                size="small"
                                variant="outlined"
                                onClick={() => salvarImagem()}
                                {...dragProps}
                            >
                                <Icon>upload</Icon>
                            </MDButton>
                            &nbsp;
                            <MDButton
                                style={{ color: 'grey', borderColor: 'grey' }}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  setImagem({
                                    content: `data:${tipo};base64,${image}`,
                                    name: '',
                                    new: false
                                  })
                                }}
                                {...dragProps}
                            >
                                <Icon>close</Icon>
                            </MDButton>
                          </>
                      }
                      </MDBox>
                      &nbsp;
                      <MDBox p={0.5}>
                        <MDButton
                          color="error"
                          size="small"
                          variant="outlined"
                          onClick={() => excluirImagem(image.id)}>
                          Excluir&nbsp;<Icon>delete</Icon>
                        </MDButton>
                      </MDBox>
                      </>
                  )}
              </ReactImageUploading>
          </Grid>
          </>
      }
      </Grid>
  );
}