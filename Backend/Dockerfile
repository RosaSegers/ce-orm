# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# copy csproj and restore
COPY ["AlumniSignup/AlumniSignup.csproj", "AlumniSignup/"]
RUN dotnet restore "AlumniSignup/AlumniSignup.csproj"

# copy rest and build
COPY . .
WORKDIR "/src/AlumniSignup"
RUN dotnet build "AlumniSignup.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AlumniSignup.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

# make container listen on 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AlumniSignup.dll"]
