/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import {useCallback, useEffect, useRef, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Print} from "@mui/icons-material";
import {Autocomplete, FormControlLabel, Input, TextField} from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";


import {useReactToPrint} from 'react-to-print';
import api from "api";
import logo from "../../../assets/images/ceg.png";
import Checkbox from "@mui/material/Checkbox";

function Tables() {
    const componentRef = useRef(null);

    const [aluno, setAluno] = useState({
        nome: "",
        id: 0,
    });
    const [listaAlunos, setListaAlunos] = useState([]);

    const reactToPrintContent = useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
    });

    useEffect(() => {
        api.get("/api/aluno/")
          .then((response) => {
              setListaAlunos(response.data.content);
          })
          .catch((error) => console.error(error))
    }, []);

    return (
      <DashboardLayout>
          <DashboardNavbar/>
          <MDBox pt={6} pb={3}>
              <Grid container spacing={6}>
                  <Grid item xs={12}>
                      <Card>
                          <MDBox
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            bgColor="dark"
                            borderRadius="lg"
                            coloredShadow="secondary"
                          >
                              <MDTypography textTransform="uppercase" variant="h6" color="white">
                                  Contrato
                              </MDTypography>
                          </MDBox>
                          <MDBox p={3} pb={3}>
                              <Grid container justifyContent='inherit' spacing={1}>
                                  <Grid item xs={12} md={12}>
                                      <MDTypography mb={1} variant="h6" color="dark">
                                          Nome aluno(a)
                                      </MDTypography>
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                      <MDBox mb={1}>
                                          <Autocomplete
                                            options={listaAlunos}
                                            getOptionLabel={(option) => option ? option.nome : ""}
                                            isOptionEqualToValue={(option, value) => option ? value : ""}
                                            onChange={(e, value) => {
                                                if (value) {
                                                    console.log(value);
                                                    setAluno(value);
                                                }
                                            }}
                                            renderInput={(params) =>
                                              <TextField
                                                {...params}
                                                label="Digite o nome do(a) aluno(a)"/>}
                                          />
                                      </MDBox>
                                  </Grid>
                              </Grid>

                              <Grid mt={2} container justifyContent='inherit' spacing={2}>
                                  <Grid item xs={12} md={5}>
                                      <MDButton
                                        fullWidth
                                        variant="gradient"
                                        startIcon={<Print/>}
                                        onClick={handlePrint}
                                        color="dark">
                                          Visualizar Impressão
                                      </MDButton>
                                  </Grid>
                              </Grid>

                          </MDBox>
                      </Card>
                      <br/>
                      <Card>
                          <MDBox ref={componentRef} p={4}>
                              <MDBox p={3} pb={3} display="flex" alignItems="center"
                                     sx={{flexDirection: 'column'}}>
                                  <Grid>
                                      <MDBox component="img" src={logo} alt="Brand" width="10rem"/>
                                  </Grid>
                                  <Grid>
                                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                                          Rua T-02. Qd 01, Lote 12A - Setor Santa Fé
                                      </MDTypography>
                                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                                          Taquaralto - Palmas - TO
                                      </MDTypography>
                                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                                          Fone (63) 3571-5751
                                      </MDTypography>
                                      <br/>
                                      <MDTypography mb={0} variant="h5" color="dark" textTransform="uppercase" sx={{textAlign: 'center'}}>
                                          Contrato de Prestação de Serviços Educacionais para 2022
                                      </MDTypography>
                                  </Grid>
                              </MDBox>
                              <MDBox p={3} pb={3}>
                                  <Grid container justifyContent='inherit' spacing={1}>
                                      <Grid item xs={12} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              DE UM COMO CONTRATANTE: {aluno.nome}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              CPF/MF: {aluno.dataNascimento}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              IDENTIDADE: {aluno.sexo}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              ÓRGÃO/EXP: {aluno.sexo}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              NACIONALIDADE: {aluno.sexo}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              ESTADO CIVIL: {aluno.naturalidade}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              PROFISSÃO: {aluno.naturalidade}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              ENDEREÇO RESIDENCIAL: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              BAIRRO: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              CIDADE: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              CEP: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              TELEFONES: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              E-MAIL: {aluno.nomePai}
                                          </MDTypography>
                                      </Grid>
                                      <br/>
                                      <br/>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              PESSOAS AUTORIZADAS PARA EM NOME DE A CONTRATANTE RETIRAR O/A ALUNO DAS DEPENDÊNCIAS DA ESCOLA, RECEBER COMUNICADOS INSTITUCIONAIS, CITAÇÕES E OU INTIMAÇÕES:
                                          </MDTypography>
                                      </Grid>
                                      <br/>
                                      <br/>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              NOME:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              CPF/MF:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              VÍNCULO COM O(A) ALUNO(A)?:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              TELEFONE:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              BAIRRO:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              NOME:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              CPF/MF:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              VÍNCULO COM O(A) ALUNO(A)?:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              TELEFONE:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                          <MDTypography variant="body2" color="dark">
                                              BAIRRO:
                                          </MDTypography>
                                      </Grid>
                                      <br/>
                                      <br/>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Na qualidade de representante legal do(a) aluno(a): {aluno.nome},
                                              matriculado(a) no(a) # do ensino # devidamente qualificado(a) na ficha de
                                              matrícula, que passa a fazer parte deste instrumento de contrato, desde já reconheço e declaro serem verdadeiras as informações prestadas neste instrumento de contrato, especialmente em relação às condições de saúde do aluno (a) abaixo declaradas:
                                          </MDTypography>
                                      </Grid>
                                      <br/>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              *	Goza de boa saúde, não fazendo uso regular de quaisquer medicamentos?
                                          </MDTypography>
                                          <FormControlLabel control={<Checkbox />} label="Sim" />
                                          <FormControlLabel control={<Checkbox />} label="Não" />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              *	Faz uso de medicamentos regulares?
                                          </MDTypography>
                                          <FormControlLabel control={<Checkbox />} label="Sim" />
                                          <FormControlLabel control={<Checkbox />} label="Não" />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Em caso positivo, quais são os medicamentos?
                                          </MDTypography>
                                          <Input fullWidth />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              *	É portador de necessidade especial?
                                          </MDTypography>
                                          <FormControlLabel control={<Checkbox />} label="Sim" />
                                          <FormControlLabel control={<Checkbox />} label="Não" />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Em caso positivo, quais são os medicamentos?
                                          </MDTypography>
                                          <Input fullWidth />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              *	Tem necessidades de utilização de equipamentos especiais?
                                          </MDTypography>
                                          <FormControlLabel control={<Checkbox />} label="Sim" />
                                          <FormControlLabel control={<Checkbox />} label="Não" />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Em caso positivo, quais são os equipamentos?
                                          </MDTypography>
                                          <Input fullWidth />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Tem necessidade de utilização de mão-de-obra e/ou acompanhamento especializado?
                                          </MDTypography>
                                          <FormControlLabel control={<Checkbox />} label="Sim" />
                                          <FormControlLabel control={<Checkbox />} label="Não" />
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              Em caso positivo especifique qual mão-de-obra e/ou acompanhamento especializado?
                                          </MDTypography>
                                          <Input fullWidth />
                                      </Grid>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>DE OUTRO LADO COMO CONTRATADA CENTRO EDUCACIONAL GÊNESIS</b>, pessoa jurídica de direito privado, com sede na Rua T-02, Qd 01, Lote 12A, Setor Santa Fé – Taquaralto, Palmas – TO, inscrita no CNPJ nº 10.522.194/0001-49, neste ato representada por sua Secretária Carla Pereira Saraiva, R.G. nº 1.613.412 SSP - MA e CPF nº 466.797.073-15, firmam o presente CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS, sob a forma dos Arts. 1º inciso IV; 5º, inciso II; 173, inciso IV; 206, inciso II e III; e 209, todos da Constituição Federal e Arts. 389, 476 e 597do Código Civil Brasileiro; da Lei nº 8.069/90 (Estatuto da Criança e do Adolescente); da Lei nº 8.078/90 (Código do Consumidor), Lei nº 8.088/94, Lei nº 9.069/95, Lei nº 9.870/99, mediante cláusulas e condições a seguir especificadas e cujo cumprimento se obrigam mutuamente.
                                          </MDTypography>
                                      </Grid>
                                      <br/>
                                      <br/>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              CLÁUSULA 1ª -  O  objeto  do  presente  contrato é a prestação de serviços  educacionais  pela  CONTRATADA, ao aluno indicado pelo CONTRATANTE, durante o ano de 2020 de acordo com o seu Plano Escolar.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              Parágrafo único - A CONTRATADA tem sua proposta educacional orientada para o seguinte objetivo: tem como pilares educacionais aprender a ser, aprender a conhecer, aprender a fazer e aprender a conviver, desenvolvendo a capacidade crítica em relação às disciplinas do currículo de ensino e a aplicação dos conhecimentos, competências e habilidades, inteirando-os na metodologia sóciointeracionista, sendo ensinados também princípios cristãos,  os  ensinamentos de cunho religioso, são fundamentados na Bíblia Sagrada baseados no respeito mútuo, amor ao próximo e convivência  com diversas culturas religiosas;
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>CLÁUSULA 2ª</b> - A <b>CONTRATADA</b>, assegura ao <b>CONTRATANTE</b>, uma vaga no seu corpo discente a ser utilizada conforme a série, grau, turno, especificidade na ficha de matrícula, ministrando o ensino através de aulas e demais atividades escolares cujo planejamento pedagógico atenda ao disposto na legislação em vigor.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 1º</b> - As aulas serão ministradas em sala de aula de forma presencial e em  locais que a <b>CONTRATADA</b> indicar, tendo em vista a natureza dos conteúdos e as técnicas pedagógicas que se fizerem necessárias de modo a atender o novo sistema de ensino.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 2º</b> - Reservar-se a  <b>CONTRATADA</b>, até 10 (dez) dias após o início de cada período letivo, o direito de cancelar qualquer turma cujo número de estudantes seja inferior a 50% (cinquenta por cento), do número máximo de alunos por sala de aula, proporcionando ao aluno, neste caso, o direito de ocupar uma vaga em outra turma da mesma série, modalidade de ensino, do mesmo ou em outro turno, desde que exista vaga.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 3º</b> - É de exclusiva competência e responsabilidade da <b>CONTRATADA</b> a orientação técnica e pedagógica decorrente a prestação dos serviços educacionais.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 4º</b> - Acordam as partes que a CONTRATADA, por não realizar o transporte de alunos, não é responsável por alunos deixados por  empresas transportadoras ou pelos pais e ou responsáveis fora do portões da escola, sendo responsável tão somente pelos alunos devidamente recebidos pela CONTRATADA e que estiverem dentro das suas dependências.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 5º - Acordam as partes que a CONTRATADA além de  se responsabilizar pelos alunos que estiverem nas suas dependências internas, tal responsabilização se restringe aos horários de aula, que serão flexiveis de acordo o cronograma de aula em  conformidade da lei e calendário próprio.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 6º - Acordam as partes que é da exclusiva responsabilidade da CONTRATANTE a permanência dos alunos antes ou depois dos horários especificados no § 5º, seja dentro, ou seja, fora das dependências da CONTRATADA, e que a saída de alunos após o turno tem tolerância máxima de 20 (Vinte) minutos.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 7º - Acordam as partes que a título de penalidade, a partir da extrapolação do horário de tolerância, por três vezes consecutivas ou intercaladas no mês, a CONTRATANTE pagará a CONTRATADA o valor de R$ 25,00 (vinte reais) por dia excedido no mês</b>.  após o término de cada horário sendo no turno matutino o término das aulas às11:30 e   às 17:30 para o turno vespertino.  Em datas e horários extra aula, é de inteira responsabilidade dos responsáveis o trânsito ou permanência dos alunos antes ou depois dos horários especificados dentro ou fora das dependências da mesma. Os pais serão chamados se ocorrer rotina de atrasos em buscar o seu filho (a).
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 8º</b> - Saída de alunos após o turno com tolerância de apenas 10 minutos. A CONTRATADA informa que após a saída do aluno no horário oficial conforme parágrafo acima, o CONTRATANTE terá tolerância de apenas 15 minutos após o horário, por um período de três vezes ao mês, e que o não cumprimento, será pago uma taxa por parte do CONTRATANTE no valor de R$ 25,00 (vinte reais) por dia excedido dentro do mês.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              CLAUSULA 3ª – Como contraprestação pelos serviços a serem prestados referentes ao período letivo de janeiro a dezembro de 2021 conforme previsto na cláusula 2ª, será a anuidade paga da seguinte forma:
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <table border={1}>
                                              <thead>
                                              <tr>
                                                <th colSpan={4}>TABELA DE PRECOS DE CONTRATO PARA O  ANO LETIVO DE 2021</th>
                                              </tr>
                                                <tr>
                                                    <th>
                                                        <MDTypography variant="h6" color="dark">
                                                            CURSO
                                                        </MDTypography>
                                                    </th>
                                                    <th>
                                                        <MDTypography variant="h6" color="dark">
                                                        N. DE PARCELAS
                                                        </MDTypography>
                                                    </th>
                                                    <th>
                                                        <MDTypography variant="h6" color="dark">
                                                        VALOR DA PARCELA
                                                        </MDTypography>
                                                    </th>
                                                    <th>
                                                        <MDTypography variant="h6" color="dark">
                                                        DIA DO VENCIMENTO
                                                        </MDTypography>
                                                    </th>
                                                </tr>
                                              </thead>
                                            <tbody>
                                              <tr>
                                                  <td>
                                                        <MDTypography variant="h6" color="dark">
                                                      Educação infantil - Nível 1 ao Nível 3
                                                        </MDTypography>
                                                  </td>
                                                  <td>
                                                        <MDTypography variant="h6" color="dark">
                                                      12
                                                        </MDTypography>
                                                  </td>
                                                  <td>
                                                        <MDTypography variant="h6" color="dark">
                                                      R$ 420,00
                                                        </MDTypography>
                                                  </td>
                                                  <td>
                                                        <MDTypography variant="h6" color="dark">
                                                      08 de cada mês (vigente)
                                                        </MDTypography>
                                                  </td>
                                              </tr>
                                            </tbody>
                                          </table>

                                      </Grid>

                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 1º - O valor da contraprestação acima pactuado poderá ser reajustado quando expressamente permitido por lei, bem como, para preservar o equilíbrio contratual, caso qualquer mudança legislativa ou normativa altere a equação econômico-financeira do presente instrumento de contrato.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>Parágrafo único</b> – A primeira parcela será cobrada no ato da matrícula ou até o dia 08 do mês vigente.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              CLÁUSULA 4ª – O CONTRATANTE declara que teve conhecimento prévio das condições financeiras deste contrato que foi exposto em local de fácil acesso e visualização (art. 2º da Lei nº 9.870/99), conhecendo-as e aceitando-as livremente.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              CLÁUSULA 5ª – Os pagamentos das parcelas deverão ser efetuados até o dia 08 de cada mês, por via de cobrança bancária ou nos locais indicados pela CONTRATADA.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 1º</b> - O pagamento da parcela vigente, efetuado até o dia 08 de cada mês, terá desconto  para a Educação Infantil e o Ensino Fundamental (1º ao 5º Ano) e  6º Ano 9º Ano.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 2 º - O pagamento efetuado após a data de vencimento será acrescido de multa no percentual de 2% (dois por cento) sobre o valor da prestação em atraso, mais correção monetária e juros de mora de 1% (um por cento) ao mês.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 3º</b> - Em caso de inadimplência, o <b>CONTRATANTE</b> perderá todo e qualquer desconto do qual seja eventualmente beneficiário.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 4º</b> - O pagamento das obrigações financeiras do CONTRATANTE será comprovado mediante apresentação do recibo (ou carnê) que individualize a obrigação quitada. O <b>CONTRATANTE</b> deverá apresentar tais comprovantes sempre que forem solicitados.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>§ 5º - O Bolsista do Programa Educar Mais Brasil</b> com mensalidades em atraso do mês corrente, terá que pagar a CONTRATANTE o valor da Mensalidade conforme tabela da Cláusula 3ª do parágrafo 6ª deste contrato.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 6º - Acordam as partes que a CONTRATADA após 30 (trinta) dias de atraso injustificado ao pagamento de qualquer parcela pactuada neste instrumento de contrato, poderá a seu exclusivo critério emitir e protestar duplicatas e ou letras de câmbio de prestação de serviço, tudo em conformidade com a legislação em vigor, podendo de forma isolada ou cumulada registrar o débito em serviço de proteção ao crédito, SERASA e ainda propor demandas objetivando receber o débito, sendo desde já acordado que é da responsabilidade da CONTRATANTE o pagamento de honorários advocatícios pactuados em 20% e demais despesas Judiciais ou extrajudiciais, ou pagamento de taxas emoluentes em caso a contratante for a protestos;
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <b>CLÁUSULA 6ª</b> – Os valores da contraprestação acima pactuada satisfazem, exclusivamente a prestação de serviços decorrentes da carga horária constante da proposta curricular da <b>CONTRATADA</b> e de seu calendário escolar.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              § 1º - Acordam as partes que este contrato não inclui o fornecimento de livros didáticos, apostilas, serviços de estudos de recuperação fora do seu expediente em que o contratante contratou os serviços (não previstos no calendário), cursos paralelos, serviços facultativos e primeiros e segunda via de documentos escolares, pelos quais a CONTRATADA cobrará as despesas correspondentes de dez por cento (10% ) do valor da mensalidade em casos da primeira ( 1º e 2º )  via de documentos e perda de provas sem atestado médico.
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="body2" color="dark">
                                              <p><strong>&sect; 2&ordm; - Acordam as partes que para suprir despesas e tributos, os servi&ccedil;os extraordin&aacute;rios efetivamente prestados ao aluno, tais como: segunda chamada de provas e exames, declara&ccedil;&otilde;es, estudo de recupera&ccedil;&atilde;o, adapta&ccedil;&atilde;o, segunda via de boletim de notas, segunda via de hist&oacute;rico escolar, segunda via de documento de conclus&atilde;o, segunda via de carn&ecirc; de pagamento, ser&atilde;o cobrados &agrave; parte, no valor de dez por cento (10%) do valor da mensalidade.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 3&ordm; - O CONTRATANTE fica ciente, ainda, que a CONTRATADA n&atilde;o presta quaisquer tipos de servi&ccedil;os em rela&ccedil;&atilde;o a estacionamento, vigil&acirc;ncia ou guarda de ve&iacute;culos automotores de qualquer natureza, n&atilde;o assumindo, portanto para si, a responsabilidade de indeniza&ccedil;&atilde;o por danos, furtos, roubos, inc&ecirc;ndios, atropelamentos, colis&otilde;es etc., que venham a ocorrer nos p&aacute;tios internos, externos, ou circunvizinhos de seus pr&eacute;dios, cuja responsabilidade ser&aacute; exclusivamente de seu condutor e/ou propriet&aacute;rio.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 4&ordm; </strong>- A CONTRATADA n&atilde;o se responsabiliza pela guarda e conseq&uuml;ente indeniza&ccedil;&atilde;o decorrente do extravio ou dos danos causados a quaisquer objetos, inclusive ve&iacute;culos, aparelhos celulares, bicicletas, papel moeda, bolsas, pessoais, aparelhos eletr&ocirc;nicos, ou qualquer bem trazido para a escola, pertencentes ou sob a posse do CONTRATANTE, do DISCENTE ou de seus prepostos ou acompanhantes, exceto se decorrentes de atos dos subordinados da CONTRATADA, mesmo porque est&aacute; contido no regimento escolar das proibi&ccedil;&otilde;es de aparelhos sonoros, celulares entre outros.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 7&ordf; &ndash; O presente instrumento poder&aacute; ser rescindido por iniciativa do CONTRATANTE (configurando cancelamento da matr&iacute;cula e transfer&ecirc;ncia do aluno), quando for o caso, mediante requerimento escrito junto &agrave; secretaria da CONTRATADA, com justificativa e anteced&ecirc;ncia de 30 (trinta) dias.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 1&ordm; </strong>- Na hip&oacute;tese de o aluno deixar de frequentar as aulas sem o aviso de que trata esta cl&aacute;usula, ser&atilde;o exigidos os pagamentos de todas as mensalidades e taxas, correspondentes aos meses de afastamento, independente do n&uacute;mero de faltas registrados no di&aacute;rio de classe.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 2&ordm;</strong> - Para efetiva&ccedil;&atilde;o da rescis&atilde;o de que trata esta cl&aacute;usula, o <strong>CONTRATANTE</strong> dever&aacute; estar quite com suas obriga&ccedil;&otilde;es financeiras at&eacute; o m&ecirc;s da rescis&atilde;o, inclusive o m&ecirc;s subseq&uuml;ente quando ocorrer ap&oacute;s a data do pagamento.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 3&ordm; - O presente contrato poder&aacute; ser rescindido por iniciativa da CONTRATADA, caso o benefici&aacute;rio do contrato cometa infra&ccedil;&atilde;o disciplinar que assim o justifique seu desligamento do estabelecimento de ensino, nos termos do regimento escolar.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 4&ordm;</strong> - Em caso de desist&ecirc;ncia da matr&iacute;cula por parte do <strong>CONTRATANTE</strong>, apenas ser&aacute; devolvida 80% da parcela j&aacute; paga, retendo a CONTRATADA a diferen&ccedil;a para cobertura de tributos e contribui&ccedil;&otilde;es, quando o cancelamento ocorrer antes do in&iacute;cio do ano letivo.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 5&ordm; - O uniforme &eacute; de uso obrigat&oacute;rio do aluno, e a inobserv&acirc;ncia da utiliza&ccedil;&atilde;o do mesmo acarretar&aacute; a advert&ecirc;ncia aos seus respons&aacute;veis, que ser&atilde;o convocados para se esclarecerem junto &agrave; dire&ccedil;&atilde;o, podendo ainda os alunos serem submetidos &agrave;s penalidades do regimento escolar.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 6&ordm; - O uniforme &eacute; marca exclusiva da contratada n&atilde;o procedendo a contratante vender ou compr&aacute;-lo de terceiros, haja vista, que sofrer sans&otilde;es c&iacute;veis cab&iacute;veis, aos direitos autorais de uso de bem ou marca;</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 8&ordf; &ndash; Ao firmar o presente contrato o CONTRATANTE declara que tem conhecimento pr&eacute;vio do Regimento Escolar e das instru&ccedil;&otilde;es espec&iacute;ficas, que lhes foram apresentados e que passam a fazer parte integrante do presente contrato, submetendo &agrave;s suas disposi&ccedil;&otilde;es, bem como, as demais obriga&ccedil;&otilde;es decorrentes da legisla&ccedil;&atilde;o aplic&aacute;vel &agrave; &aacute;rea de ensino e ao projeto pol&iacute;tico pedag&oacute;gico da escola.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 1&ordm; - O CONTRATANTE declara que al&eacute;m de estar ciente da obrigatoriedade do uso completo do uniforme escolar por parte do aluno, est&aacute; ciente da obrigatoriedade da higieniza&ccedil;&atilde;o pessoal, que est&aacute; ciente da obrigatoriedade de aquisi&ccedil;&atilde;o de todo material escolar individual e coletivo do aluno exigido, assumindo inteiramente a responsabilidade por qualquer fato que venha a prejudicar o aluno pelo descumprimento destas obriga&ccedil;&otilde;es.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 2&ordm; - O n&atilde;o comparecimento do aluno por algum motivo aos atos escolares ora contratados, n&atilde;o o exime do pagamento, tendo em vista a disponibilidade do servi&ccedil;o colocado ao CONTRATANTE.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 9&ordf; &ndash; O CONTRATANTE assume total responsabilidade quanto &agrave;s declara&ccedil;&otilde;es prestadas neste contrato no ato da matr&iacute;cula, relativas &agrave; aptid&atilde;o legal do aluno para a frequ&ecirc;ncia na s&eacute;rie e anos indicados, quando for o caso, estando ciente de que a n&atilde;o apresenta&ccedil;&atilde;o dos documentos legais comprobat&oacute;rios, implicar&aacute; no posicionamento do aluno no n&iacute;vel e s&eacute;rie/anos demonstrados no resultado de testes de classifica&ccedil;&atilde;o, isentando a CONTRATADA de qualquer responsabilidade pelos eventuais danos resultantes.</strong></p>
                                              <p>&nbsp;</p>
                                              <p>Par&aacute;grafo &uacute;nico &ndash; Acordam as partes que no ato da matr&iacute;cula os pais ou respons&aacute;veis pelo contrato dever&atilde;o trazer declara&ccedil;&atilde;o de curso ou o hist&oacute;rico escolar, e que as turmas ser&atilde;o formadas somente quando todos os alunos tiverem a escolaridade devidamente comprovada.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 10&ordf; &ndash; A CONTRATADA n&atilde;o estar&aacute; obrigada a renovar a matr&iacute;cula do benefici&aacute;rio do CONTRATANTE, para o per&iacute;odo letivo posterior, caso este n&atilde;o tenha cumprido rigorosamente as cl&aacute;usulas do presente contrato, inclusive a quita&ccedil;&atilde;o de qualquer pend&ecirc;ncia financeira com a CONTRATADA.</strong></p>
                                              <p>&nbsp;</p>
                                              <p>CL&Aacute;USULA 11&ordf; &ndash; A CONTRATANTE compromete-se a comunicar expressamente e imediatamente &agrave; CONTRATADA sobre a exist&ecirc;ncia e o teor de decis&otilde;es judiciais que venham a alterar o regime de guarda do benefici&aacute;rio, n&atilde;o responsabilizando a CONTRATADA por quaisquer fatos que resultem da n&atilde;o observ&acirc;ncia da presente cl&aacute;usula.</p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 12&ordf; &ndash; A CONTRATANTE cede gratuitamente, o direito de imagem do benefici&aacute;rio (aluno), do qual &eacute; respons&aacute;vel legal, para figurar, individualmente ou coletivamente, em campanhas institucionais da CONTRATADA, para todos os efeitos legais, observada a moral e os bons costumes, bem como, dos projetos que a escola desenvolve onde h&aacute; fluxo de pais ou parentes apreciando os eventos e deste registrando os momentos das culmin&acirc;ncias dos projetos pedag&oacute;gicos, dando-lhes os direitos de filmarem, fotografarem e se apropriarem das imagens sem qualquer remunera&ccedil;&atilde;o;</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>&sect; 1&deg; - Confere a contratada todos direitos de uso de imagem e voz sendo atrav&eacute;s de v&iacute;deo chamada, v&iacute;deos explicativo para apresenta&ccedil;&atilde;o de trabalho, projetos, feira em car&aacute;ter pedag&oacute;gico, bem como interagir com os seus professores e equipe pedag&oacute;gica a fim de tirar d&uacute;vidas explica&ccedil;&otilde;es dos conte&uacute;dos e atividade trabalhados ou sugeridos para que melhor os alunos sejam atendidos.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 13&ordf; A CONTRATADA ser&aacute; indenizada pelo CONTRATANTE por quaisquer danos moral ou preju&iacute;zo que este ou o DISCENTE, preposto ou acompanhante de qualquer um deles, venha a causar danos nos edif&iacute;cios, instala&ccedil;&otilde;es, mobili&aacute;rios ou equipamentos da CONTRATADA.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 14&ordf; &ndash; Fica expressamente proibido a entrada de pais para conversarem e ou para qualquer tipo de intimida&ccedil;&atilde;o ao corpo discente, evitando assim constrangimentos aos mesmos. Caso haja qualquer reclama&ccedil;&atilde;o, o interessado dever&aacute; procurar &agrave; dire&ccedil;&atilde;o da escola para que tome as devidas atitudes e ou provid&ecirc;ncias, conforme determina a Lei que ampara a crian&ccedil;a e ao adolescente n. 8.069/90. No caso que o filho do interessado foi v&iacute;tima de qualquer fato ou situa&ccedil;&atilde;o, tamb&eacute;m dever&aacute; formalizar juntamente &agrave; dire&ccedil;&atilde;o para que esta fa&ccedil;a cumprir o regimento escolar;</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 15&ordf; &ndash; E por estarem as partes de acordo com os termos do presente instrumento, assinam o presente contrato em duas vias de igual valor e forma, juntamente com as duas testemunhas, para que se produzam todos os efeitos jur&iacute;dicos.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CLAUSULA 16&ordf; &ndash; Acordam as partes que para todas as comunica&ccedil;&otilde;es referentes ao aluno (a), e ou notifica&ccedil;&otilde;es e ou cita&ccedil;&otilde;es consideram-se v&aacute;lidos al&eacute;m dos endere&ccedil;os aqui fornecidos pelo CONTRATANTE, tamb&eacute;m os constantes no requerimento de matr&iacute;cula, e consideram-se v&aacute;lidos os comunicados, notifica&ccedil;&otilde;es e ou cita&ccedil;&otilde;es realizados pelos meios eletr&ocirc;nicos tais como e-mails, whatsapp e similares, sendo consideradas entregas todas as remessas nos referidos endere&ccedil;os, salvo altera&ccedil;&otilde;es devidamente e expressamente comunicadas &agrave; secret&aacute;ria da escola.</strong></p>
                                              <p>&nbsp;</p>
                                              <p><strong>CL&Aacute;USULA 17&ordf; - DA CL&Aacute;USULA COMPROMISS&Oacute;RIA: Toda e qualquer quest&otilde;es eventualmente oriundas do presente contrato, e a ele correlatos, ser&atilde;o resolvidas, de forma definitiva via concilia&ccedil;&atilde;o ou arbitragem, na CONCILIARBRASIL &ndash; Centro de Media&ccedil;&atilde;o, Concilia&ccedil;&atilde;o e Arbitragem, na Av. Teot&ocirc;nio Segurado, 501 Sul, Edif&iacute;cio Amaz&ocirc;nia Center, sala 401, Palmas/TO, em conformidade com as normas do regulamento interno e consoante o preceitos ditados pela Lei Federal n.&ordm; 9.307/96 de 23.09.1996.</strong></p>
                                          </MDTypography>
                                      </Grid>
                                  </Grid>
                              </MDBox>
                              <MDBox p={3} pb={3} display="flex" alignItems="center"
                                     sx={{flexDirection: 'column'}}>
                                  <Grid>
                                      <MDTypography mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                                          ______________________________________
                                      </MDTypography>
                                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                                          CONTRATADO
                                      </MDTypography>
                                      <br/>
                                      <br/>
                                      <MDTypography mb={0} variant="body2" color="dark" sx={{textAlign: 'center'}}>
                                          ______________________________________
                                      </MDTypography>
                                      <MDTypography mb={0} variant="h6" color="dark" sx={{textAlign: 'center'}}>
                                          CONTRATANTE
                                      </MDTypography>
                                  </Grid>
                              </MDBox>
                              <MDBox p={3} pb={3}>
                                  <Grid container justifyContent='inherit' spacing={1}>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              TESTEMUNHAS
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              1ª ________________________________
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              CPF ______________________________
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              2ª ________________________________
                                          </MDTypography>
                                      </Grid>
                                      <Grid item xs={12} md={12}>
                                          <MDTypography variant="h6" color="dark">
                                              CPF ______________________________
                                          </MDTypography>
                                      </Grid>
                                  </Grid>
                              </MDBox>
                          </MDBox>
                      </Card>
                  </Grid>
              </Grid>
          </MDBox>
          <Footer/>
      </DashboardLayout>
    );
}

export default Tables;
